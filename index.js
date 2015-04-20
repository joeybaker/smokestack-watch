'use strict'

var browserify = require('browserify')
  , smokestack = require('smokestack')
  , watchify = require('watchify')
  , path = require('path')
  , tapSpec = require('tap-spec')
  , glob = require('glob')
  , through = require('through2')
  , cwd = process.cwd()

module.exports = function smokestackWatch (options){
  var testPatterns = options.patterns.map(function makeAbsolutePaths (pattern){
      return path.join(cwd, pattern)
    })
    , rebundle
    , bundle
    , tests

  bundle = browserify({
    fullPaths: true
    , cache: {}
    , packageCache: {}
    , debug: options.debug
    // watchify has a 600ms delay … for windows compatibility?
    , delay: options.delay || 0
    // ignore node_modules
    , ignoreWatch: typeof options.ignoreWatch === 'undefined' ? true : options.ignoreWatch
  })

  // allow as many listeners as we need so that we can watch all the files.
  bundle.setMaxListeners(Infinity)

  rebundle = function rebundle () {
    console.info('==== Compiling ====')
    bundle.bundle()
      .on('error', console.error.bind(console))
      .pipe(through(
        function noopTransform (chunk, enc, cb){
          cb(null, chunk)
        }
        , function logThatTestingStarts (cb){
          console.info('==== Testing ====')
          cb()
        }
      ))
      .pipe(smokestack({
        browser: options.browser || 'chrome'
        , timeout: options.timeout || 1000 * 60 * 5
      }))
      .pipe(tapSpec())
      .pipe(process.stdout)
  }

  // prepend tap-closer
  bundle.add('tap-closer/bundle.js')
  // find the tests from the pattern
  tests = testPatterns.reduce(function globPattern (files, pattern){
    return files.concat(glob.sync(pattern))
  }, [])
  bundle.add(tests)

  options.transforms.forEach(bundle.transform.bind(bundle))
  options.plugins.forEach(bundle.plugin.bind(bundle))

  bundle = watchify(bundle, {delay: options.debug || 0})
  bundle.on('update', rebundle)

  rebundle()
}
