#!/usr/bin/env node

'use strict'

var minimist = require('minimist')
  , argv = minimist(process.argv.slice(2))
  , defaults = require('lodash.defaults')
  , options = defaults({
    debug: true
    , delay: 0
    , ignoreWatch: true
    , browser: 'chrome'
    , transforms: []
    , plugins: []
    , patterns: ['test/*.js']
  }, {
    debug: argv.d || argv.debug
    , delay: argv.delay
    , ignoreWatch: argv['ignore-watch']
    , browser: argv.browser
    , transforms: argv.t || argv.transform
    , plugins: argv.p || argv.plugins
    , patterns: argv._
  })

require('../index.js')(options)

