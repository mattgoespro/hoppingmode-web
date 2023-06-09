import path from "path";
import { Configuration } from "webpack";
import nodeExternals from "webpack-node-externals";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";

const config: Configuration = {
  devtool: false,
  mode: "production",
  target: "node",
  entry: "./src/index.ts",
  resolve: {
    extensions: [".ts"],
    plugins: [new TsconfigPathsPlugin()]
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.js",
    clean: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ESLintPlugin({
      context: path.resolve(__dirname, "./src"),
      extensions: [".ts"],
      failOnWarning: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["ts-loader"]
      }
    ]
  },
  externals: [nodeExternals()]
};

module.exports = config;
