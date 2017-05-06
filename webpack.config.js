const webpack = require('webpack')
const path = require('path')

let config = {
    entry: './src/L.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        libraryTarget: 'this'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: [['es2015', {modules: false}], 'stage-1']
                }
            }
        ]
    },
    plugins: []
}

let NODE_ENV = process.env.NODE_ENV.replace(/\s/g, '')

if (NODE_ENV === 'development') {

    console.log('WWW')

    config.watch = true
    config.output.filename = 'L.js'

} else if (NODE_ENV === 'production') {
    config.output.filename = 'L.min.js'
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }))

}

console.log(JSON.stringify(config, null, 2))

module.exports = config
