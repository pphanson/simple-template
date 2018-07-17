const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const pages = require('./src/constants');

function generateMultipleHTMLPage(pages) {
    const htmls = [];
    for ( [key, value ]of Object.entries(pages)) {
        htmls.push(new HtmlWebpackPlugin({
            title: key,
            template: './src/index.ejs',
            filename: `./${key}.html`,
            templateParameters: Object.assign({ pageGuid: `<script>window.__pageGuid__= "${key}"</script>` }, value) ,
            
        }))
    }
    return htmls;
} 


module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve("./build"),
        publicPath: '/'
    },
    module: {
        rules: [
          { test: /\.ejs$/, use: 'ejs-loader' },
          { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']}, 
          { test: /\.html$/, loader: 'html-loader' },
          { test: /\.(js|jsx)$/,  use: {
            loader: 'babel-loader',
            options: {
              presets: ['babel-preset-env']
            } }
          }
        ]
    },
    plugins: generateMultipleHTMLPage(pages),
    devServer: {
        contentBase: path.resolve(__dirname, './build')
    },
};