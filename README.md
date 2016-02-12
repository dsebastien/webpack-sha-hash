# webpack-sha-hash

[![NPM version](https://img.shields.io/npm/v/webpack-sha-hash.svg)](https://www.npmjs.com/package/webpack-sha-hash)
[![Downloads](https://img.shields.io/npm/dm/webpack-sha-hash.svg)](https://www.npmjs.com/package/webpack-sha-hash)
[![Build Status](https://secure.travis-ci.org/dsebastien/webpack-sha-hash.png?branch=master)](https://travis-ci.org/dsebastien/webpack-sha-hash)
[![Dependency Status](https://david-dm.org/dsebastien/webpack-sha-hash.svg?theme=shields.io&style=flat)](https://david-dm.org/dsebastien/webpack-sha-hash)
[![devDependency Status](https://david-dm.org/dsebastien/webpack-sha-hash/dev-status.svg?theme=shields.io&style=flat)](https://david-dm.org/dsebastien/webpack-sha-hash#info=devDependencies)
[![License](https://img.shields.io/cocoapods/l/AFNetworking.svg)](LICENSE.MD)

## About
Using this Webpack plugin, you can easily generate SHA hashes for your Webpack chunks.
This plugin replaces the standard chunkhash of Webpack with SHA.

This project is a fork of https://github.com/erm0l0v/webpack-md5-hash based on SHA instead of MD5.
Why? Because MD5 is a thing of the past, so why continue to use it? :)

SHA hashes are created using [sha.js](https://www.npmjs.com/package/sha.js)

## Status & roadmap
Check out the issues/labels and milestones to get an idea of what's next.
For existing features, refer to the previous sections.

Check out the [change log](CHANGELOG.MD)

## Installation
``` bash
npm install webpack-sha-hash --save-dev
```

## Usage
Like most plugins, you just need to import it and add it to your plugins array:

``` javascript
const WebpackSHAHash = require('webpack-sha-hash');

module.exports = {
    // ...
    output: {
        //...
        chunkFilename: "[chunkhash].[id].chunk.js"
    },
    plugins: [
        new WebpackSHAHash()
    ]
};
```

Enjoy!

## Options
Not implemented yet.

Currently, the SHA-256 algorithm is used by default. In the future, you'll be able to choose which version of SHA to use.

## Contributing
Take a look at the project's open [issues](https://github.com/dsebastien/webpack-sha-hash/issues) and [milestones](https://github.com/dsebastien/webpack-sha-hash/milestones).

If you know what to do then:
* Fork the project
* Create a feature branch in your fork
* Rebase if needed to keep the project history clean
* Commit your changes & push to GitHub
* Try and flood me with pull requests :)

## Building from source
``` bash
npm run setup
npm
```

## Releasing a version
* commit all changes to include in the release
* edit the version in package.json
  * respect semver
* update CHANGELOG.MD
* commit
* git tag <version>
* git push --tags
* draft the release on GitHub (add description, link to current changelot, etc)
* npm publish

## Authors
### Sebastien Dubois
* [@Blog](https://www.dsebastien.net)
* [@Twitter](https://twitter.com/dSebastien)
* [@GitHub](https://github.com/dSebastien)

## License
This project and all associated source code is licensed under the terms of the [MIT License](https://en.wikipedia.org/wiki/MIT_License).
