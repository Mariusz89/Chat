const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeJsPlugin = require("optimize-js-plugin");

const env = process.env.NODE_ENV || 'development';

module.exports = {
        entry: (env !== 'production' ? [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server'
        ] : []).concat(['./client/index.js']),
    output: {
      filename: './bundle.js',
      path: path.resolve(__dirname, 'public'),
    },
        devServer: {
        compress: true,
        disableHostCheck: true,
        inline: true,
        port: 8080
    },
    module: {
		rules: [
		    {
		        test: /\.js$/,
		        loader: "babel-loader",
                exclude: /node_modules/
		    },
		    {
		        test: /\.css$/,
		        use: [
		            { loader: 'style-loader'},
		            {
		                loader: 'css-loader',
		                options: {
		                    modules: true
		                }
		            }
		        ]
		    }
		]
    },
    devtool: 'inline-source-map',
	plugins: 
    [
	    new HtmlWebpackPlugin({
	      template: 'public/index.html',
	      filename: 'index.html',
	      inject: 'body'
	    })]
	    .concat((env !== 'production') ? [
	    ] : [
	        new webpack.optimize.UglifyJsPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
	        new OptimizeJsPlugin({
	          	sourceMap: false
	        }),
	    ]),
};


console.log('NODE_ENV:', env);


