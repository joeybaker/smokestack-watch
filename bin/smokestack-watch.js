#!/usr/bin/env node

'use strict'

var minimist = require('minimist')
  , argv = minimist(process.argv.slice(2), {
    boolean: ['d', 'debug']
  })
  , defaults = require('lodash.defaults')
  , transforms = argv.t || argv.transform
  , plugins = argv.p || argv.plugins
  , options = defaults({
    debug: argv.d || argv.debug
    , delay: argv.delay
    , ignoreWatch: argv['ignore-watch']
    , browser: argv.browser
    , transforms: !Array.isArray(transforms) && transforms ? [transforms] : transforms
    , plugins: !Array.isArray(plugins) && plugins ? [plugins] : plugins
    , patterns: argv._.length ? argv._ : void 0
    , timeout: argv.timeout
    , reporter: argv.r || argv.reporter
  }, {
    debug: true
    , delay: 0
    , ignoreWatch: true
    , browser: 'chrome'
    , transforms: []
    , plugins: []
    , patterns: ['test/*.js']
    , timeout: 5000
  })

require('../index.js')(options)

