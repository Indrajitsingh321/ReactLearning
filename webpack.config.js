var webpack = require('webpack'),
    path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src/'),
    entry: './index.js',
    devtool: 'source-map',
    target: 'web',
    cache: true,
    
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    },
    output: {
        path: path.resolve(__dirname, 'C:/Users/1119164/Desktop/React-Development/deliveryutilities/'),
        filename: 'deliveryutilities.js'
    }
};