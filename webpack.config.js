const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: { main: './src/index.tsx' },
	output: {
		filename: '[name].js',
		path: __dirname + '/dist'
	},

	devtool: 'source-map',

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json', '.css']
	},

	module: {
		rules: [
			{ test: /\.(gif|jpe?g|png|ico)$/, loader: 'url-loader?limit=5000' },
			{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
			{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
		]
	},

	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({ template: 'src/index.html' }),
		new CopyWebpackPlugin(['src/tickets.json'])
	],

	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
	}
};
