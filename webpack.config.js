module.exports = {
    entry: "./client/src/components/index.js",
    output: {
        path: 'client/build/js/',
        filename: "index.js" 
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query:
                {
                    presets:['react']
                }
        }]
    }
};



