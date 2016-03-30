/* eslint no-var: 0 */
'use strict'

var opts = require('./util/config')

var config = require('./util/generate-config')({
  output: {
    libraryTarget: 'commonjs2',
    path: opts.buildPath + '/lib'
  },
  externals: require('./util/externals')
}, process.env.NODE_ENV, process.env.MINIFY)

// need to override default resolve config for the build
// so that the babel transform-runtime plugin generates the correct paths
// this can be fixed when the cli is extracted from this repo
config.resolve = {
  root: opts.rootPath,
  modulesDirectories: [
    'node_modules'
  ]
}

module.exports = config