var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path')

var APP_DIR = path.resolve(__dirname,'src');
var DIST  = path.resolve(__dirname,'..','server','dist');

module.exports = {

    entry : ['babel-polyfill', path.resolve(APP_DIR,'main.js')],
    output : {
        path : DIST,
        filename : 'app.bundle.js'
    },
    devtool : 'cheap-module-source-map',
    module:{
        rules : [
            {
                test : /\.js$/,
                exclude: /(node_modules)/,
                loader:'babel-loader',
                options: {
                   presets:[ 'react' , 'es2015']
                }
            },
            {
                test : /\.less$/,
                exclude : /(node_modules)/,
                use:[
                    {
                        loader:'style-loader'
                    },
                    {
                        loader:'css-loader'
                    },
                    {
                        loader:'less-loader'
                    }
                ]
            },
            {
                test : /\.css$/,
                use:[
                    {
                        loader:'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test : /\.(woff|woff2|ttf|eot|svg|png|jpg)$/,
                use: 'file-loader'
            }
            
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            name:'index.html',
            template:path.resolve(APP_DIR,'index.html')
        }),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV':JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    resolve:{
        extensions: ['.js']
    }
}