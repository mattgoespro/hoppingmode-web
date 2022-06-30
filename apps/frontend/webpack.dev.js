const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');

module.exports = (nxConfig, nxOptions) => {
  const webpackCommon = require('./webpack.common')(nxConfig, nxOptions);

  return merge(webpackCommon, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        async: false,
        typescript: {
          configFile: path.resolve(__dirname, 'tsconfig.app.json')
        }
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false
      })
    ],
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:8081'
        }
      }
    }
  });
};
