// webpack.config.js
var webpack = require('webpack'),
	path = require('path');

var PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
	// the main entry of our app
	entry: [
		'./src/index.js',
		'./src/auth/index.js'
	],
	// output configuration
	output: {
		path: __dirname + '/public/',
		publicPath: 'public/',
		filename: 'build.js'
	},

	resolveLoader: {
		root: path.join(__dirname, 'build')
	},

	module: {
		loaders: [
			// process *.vue files using vue-loader
			{
				test: /\.vue$/,
				loader: 'vue'
			},
			// process *.js files using babel-loader
			// the exclude pattern is important so that we don't
			// apply babel transform to all the dependencies!
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//
			}
		]
	},

	babel: {
		presets: ['es2015'],
		plugins: ['transform-runtime']
	},

	plugins: PROD ? [
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false }
		})
	] : []
};
