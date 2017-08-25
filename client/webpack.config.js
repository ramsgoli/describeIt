const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: 'index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build/bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {loader: "css-loader",
                            options: {
                                minimize: true,
                                modules: true
                            }
                        },
                        {loader: "sass-loader"},
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('build/bundle.css')
    ],
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: [path.join(__dirname, 'public')],
        port: 8080
    }
}
