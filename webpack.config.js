const path = require('path');

module.exports = {
    entry: {
        app: './client/landingPage.jsx',
        hostPage: './client/hostPage.jsx',
        gamePage: './client/gamePage.jsx',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                      }
                },
                
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/img/',
                            publicPath: 'assets/img/',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
      },
      mode: 'development', // Use development mode for easier debugging
      devtool: 'source-map', // Enable source maps
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]Bundle.js',
    },
};