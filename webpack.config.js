const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /.\css$/,
        use: ['css-loader']
      }

    ]
  }
}

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    clean: true, 
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader/* "style-loader"*/, "css-loader", ]
      },
      // {
      //   test: /\.less$/,
      //   use: [MiniCssExtractPlugin.loader/* "style-loader"*/, "css-loader", "less-loader", ]
      // },
      // {
      //   test: /\.s[ac]ss$/,
      //   use: [MiniCssExtractPlugin.loader/* "style-loader"*/, "css-loader", "sass-loader", ]
      // },
      // {
      //   test: /\.styl$/,
      //   use: [MiniCssExtractPlugin.loader/* "style-loader"*/, "css-loader", "stylus-loader", ]
      // },
      {
        test: /\.(png|jpe?g|gif|webp)/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
        generator: {
          filename: "static/imgs/[hash:8][ext][query]"
        }
      },
      {
        test: /\.(ttf|woff2?|mp4|mp3|avi)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[hash:8][etc][query]"
        }
      },
      {
        test: /.\js/,
        exclude: /node_modules/,
        loader: "babel-loader",
      }
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, "src/js"),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/index.css"
    }),
    new CssMinimizerPlugin(),
  ],
  devServer: {
    host: "localhost",
    port: "8889",
  },
  mode: "development",
}