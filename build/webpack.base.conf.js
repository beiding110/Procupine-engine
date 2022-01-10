var path = require('path'),
    libraryName = 'Pro',
    outputFileName = 'procupine',
    plugins  = [],
    mode = ['development', 'production', 'none'],
    modeIndex = 0;

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: process.env.NODE_ENV === 'production'
            ? outputFileName + '.min.js'
            : outputFileName + '.js',
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
          },
        ]
    },
    resolve: {
        alias: {
            '@': resolve('src'),
        }
    }
};
