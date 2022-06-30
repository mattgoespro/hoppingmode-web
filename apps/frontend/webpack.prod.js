const { merge } = require('webpack-merge');

const webpackCommon = require('./webpack.common');

module.exports = (nxConfig, nxOptions) => {
  return merge(webpackCommon(nxConfig, nxOptions), {
    mode: 'production',
    devtool: 'inline-source-map'
  });
};

// module.exports = (_env, _argv) => {
//   const webpackCommon = require('./webpack.common')(_env, _argv);

//   return merge(webpackCommon, {
//   mode: 'production',
//   devtool: 'inline-source-map',
//   plugins: [new CssMinimizerPlugin()],
//   optimization: {
//     minimize: true,
//     minimizer: [
//       new TerserWebpackPlugin({
//         terserOptions: {
//           compress: true,
//           mangle: {
//             safari10: true
//           },
//           output: {
//             comments: false,
//             ascii_only: true
//           },
//           warnings: false
//         }
//       }),
//       new CssMinimizerPlugin()
//     ],
//     runtimeChunk: 'single',
//     splitChunks: {
//       cacheGroups: {
//         vendor: {
//           test: /[\\/]node_modules[\\/]/,
//           name: 'vendors',
//           chunks: 'all'
//         }
//       }
//     }
//   },
//   performance: {
//     hints: false,
//     maxEntrypointSize: 512000,
//     maxAssetSize: 512000
//   }
// });
// };
