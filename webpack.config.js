module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        publicPatch:'/',
        filename: 'bundle.js'
},
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            loader: 'babel',
            query: {
                presets: ['react', 'es2015','stage-1']
            },
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/
        }]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        port:9000
    }
};
