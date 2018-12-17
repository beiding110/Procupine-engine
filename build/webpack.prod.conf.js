const webpack = require('webpack')
const webpackConfigBase = require("./webpack.base.conf")
const merge = require("webpack-merge");

const webpackConfigProd = {
    mode: 'production'
}

module.exports = merge(webpackConfigBase, webpackConfigProd)
