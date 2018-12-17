const path = require("path");
const webpackConfigBase = require("./webpack.base.conf");
const merge = require("webpack-merge");

const webpackConfigDev = {
    devtool: 'source-map',
    mode: 'development'
}
module.exports = merge(webpackConfigBase, webpackConfigDev)
