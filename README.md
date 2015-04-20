# smokestack-watch [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

Use watchify to run tape tests with smokestack

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [Install](#install)
- [Usage](#usage)
- [CLI flags](#cli-flags)
  - [`d` or `debug`](#d-or-debug)
  - [`delay=0`](#delay=0)
  - [`ignore-watch=true`](#ignore-watch=true)
  - [`browser="chrome"`](#browser=chrome)
  - [`t` or `transform`](#t-or-transform)
  - [`p` or `plugin`](#p-or-plugin)
- [Tests](#tests)
- [Developing](#developing)
  - [Requirements](#requirements)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

```sh
npm i -g smokestack-watch
```


## Usage

```sh
smokestack-watch test/suite1/*.js test/suite2/*.js
```

```js
var smokestackWatch = require('smokestack-watch')

smokestackWatch({
  // the defaults
  debug: true
  , delay: 0
  , ignoreWatch: true
  , browser: 'chrome'
  , transforms: []
  , plugins: []
  , patterns: []
  , timeout: 300000 // 5 minutes
})
```

## CLI flags
### `d` or `debug`
Enable sourcemaps. Defaults to `true`.

### `delay=0`
How long should watchify wait before compiling? Defaults to `0`

### `ignore-watch=true`
Sets the `ignoreWatch` watchify option. Defaults to `true` which disables watching `node_modules`.

### `browser="chrome"`
Which browser should smokestack launch? Defaults to `chrome`.

### `t` or `transform`
Pass transform options to browserify.

### `p` or `plugin`
Pass plugin options to browserify.

### `timeout`
Timeout time for smokestack. Defaults to 5 minutes.

## Tests
Tests are in [tape](https://github.com/substack/tape) and code coverage is run though [covert](https://github.com/substack/covert). But are not at all complete.

* `npm test` will run both server and browser tests
* `npm run tdd` will run the server tests on every file change.

## Developing
To publish, run `npm run release -- [{patch,minor,major}]`

_NOTE: you might need to `sudo ln -s /usr/local/bin/node /usr/bin/node` to ensure node is in your path for the git hooks to work_

### Requirements
* **npm > 2.0.0** So that passing args to a npm script will work. `npm i -g npm`
* **git > 1.8.3** So that `git push --follow-tags` will work. `brew install git`

## License

Artistic 2.0 © [Joey Baker](https://byjoeybaker.com)


[npm-url]: https://npmjs.org/package/smokestack-watch
[npm-image]: https://badge.fury.io/js/smokestack-watch.svg
[travis-url]: https://travis-ci.org/joeybaker/smokestack-watch
[travis-image]: https://travis-ci.org/joeybaker/smokestack-watch.svg?branch=master
[daviddm-url]: https://david-dm.org/joeybaker/smokestack-watch.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/joeybaker/smokestack-watch
