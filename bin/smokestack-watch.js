#!/usr/bin/env node

'use strict'

var minimist = require('minimist')
  , argv = minimist(process.argv.slice(2))
  , defaults = require('lodash.defaults')
  , transforms = argv.t || argv.transform
  , plugins = argv.p || argv.plugins
  , options = defaults({
    debug: argv.d || argv.debug
    , delay: argv.delay
    , ignoreWatch: argv['ignore-watch']
    , browser: argv.browser
    , transforms: Array.isArray(transforms) ? transforms : [transforms]
    , plugins: Array.isArray(plugins) ? plugins : [plugins]
    , patterns: argv._
  }, {
    debug: true
    , delay: 0
    , ignoreWatch: true
    , browser: 'chrome'
    , transforms: []
    , plugins: []
    , patterns: ['test/*.js']
  })

require('../index.js')(options)

