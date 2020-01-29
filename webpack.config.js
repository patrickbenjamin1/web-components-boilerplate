/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    template: './source/index.html',
    filename: './index.html',
});

const terserPlugin = new TerserPlugin({
    cache: true,
});

module.exports = {
    entry: './source/index.ts',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'output/'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: ['ts-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['source-map-loader'],
                enforce: 'pre',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader',
            },
            {
                test: /\.html$/,
                loader: 'html-loader?exportAsEs6Default',
            },
            {
                test: /\.(jpg|ttf|svg|woff2?|eot|png|mp4|mp3|wav)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/',
                        publicPath: 'assets',
                    },
                },
            },
        ],
    },
    devServer: {
        contentBase: '/output',
        historyApiFallback: true,
        port: 8000,
        writeToDisk: true,
        open: 'index.html',
    },
    plugins: [htmlPlugin],
    resolve: {
        extensions: ['.ts', '.js', '.json', '.tsx', '.jsx'],
    },
    optimization: {
        minimizer: [terserPlugin],
    },
};
