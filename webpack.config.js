/* eslint-disable no-undef */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
module.exports = {
    entry: ["@babel/polyfill", "./src/entry.js"],
    devtool: "source-map",
    mode: 'production',
    output: {
        path: path.join(__dirname, "dist/"),
        publicPath: "/dist/",
        filename: "[name].js",
    },
    module: {
        rules: [{
                test: /\.(jsx|js)$/,
                include: path.resolve(__dirname, 'src'),
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                    plugins: ["transform-class-properties"],
                }
            },
            {
                test: /\.json$/,
                loader: "json-loader",
                exclude: [
                    path.join(__dirname, "node_modules/"),
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    'resolve-url-loader',
                    "postcss-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader'
                    },
                    {
                        loader: "postcss-loader"
                    }
                ]
            },
            {
                test: /\.(pdf|png|svg|jpg|gif|webp)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        limit: 500,
                        name: "./images/[name].[ext]"
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        limit: 500,
                        name: "./fonts/[name].[ext]"
                    }
                }]
            }
        ]
    },
    resolve: {
        modules: [
            path.join(__dirname, "src"),
            "bower_components",
            "node_modules",
        ],
        extensions: [
            ".js",
            ".jsx",
            ".style"
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./css/[name].css"
        }),
        new CopyWebpackPlugin([{
            to: "./",
            from: "./index.html"
        }])
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
};