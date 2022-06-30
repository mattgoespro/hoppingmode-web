const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// function setDevServerApiHost(env) {
//   let apiTarget = env['api-target'];
//   let apiHost;
//   let hostName;

//   if (apiTarget === 'api') {
//     apiHost = 'http://localhost:8080';
//     hostName = 'API';
//   } else if (apiTarget === 'stub') {
//     apiHost = 'http://localhost:8081';
//     hostName = 'API Stub';
//   } else if (apiTarget === 'local') {
//     if (env.apiPort) {
//       apiHost = `http://localhost:${env.apiPort}`;
//     } else {
//       throw new Error('API target port not specified.');
//     }
//   }

//   if (hostName === 'API') {
//     console.log(`
//       ___  _               _    _                        _  _    _        ___  _  _    _  _        _         _    ___  ___
//      / __|| |_  __ _  _ _ | |_ (_) _ _   __ _   __ __ __(_)| |_ | |_     / __|(_)| |_ | || | _  _ | |__     /_\\  | _ \\|_ _|
//      \\__ \\|  _|/ _\` || '_||  _|| || ' \\ / _\` |  \\ V  V /| ||  _|| ' \\   | (_ || ||  _|| __ || || || '_ \\   / _ \\ |  _/ | |
//      |___/ \\__|\\__,_||_|   \\__||_||_||_|\\__, |   \\_/\\_/ |_| \\__||_||_|   \\___||_| \\__||_||_| \\_,_||_.__/  /_/ \\_\\|_|  |___|
//                                         |___/
//     `);
//   } else if (hostName === 'API Stub') {
//     console.log(`
//       ___  _               _    _                        _  _    _       ___  _          _
//      / __|| |_  __ _  _ _ | |_ (_) _ _   __ _   __ __ __(_)| |_ | |_    / __|| |_  _  _ | |__
//      \\__ \\|  _|/ _\` || '_||  _|| || ' \\ / _\` |  \\ V  V /| ||  _|| ' \\   \\__ \\|  _|| || || '_ \\
//      |___/ \\__|\\__,_||_|   \\__||_||_||_|\\__, |   \\_/\\_/ |_| \\__||_||_|  |___/ \\__| \\_,_||_.__/
//                                         |___/
//     `);
//   } else {
//     console.log(`
//       ___  _               _    _                       _  _    _                _       _    ___  ___
//      / __|| |_  __ _  _ _ | |_ (_) _ _   __ _  __ __ __(_)| |_ | |_   ___  _  _ | |_    /_\\  | _ \\|_ _|  _ __  _ _  ___ __ __ _  _
//      \\__ \\|  _|/ _\` || '_||  _|| || ' \\ / _\` | \\ V  V /| ||  _|| ' \\ / _ \\| || ||  _|  / _ \\ |  _/ | |  | '_ \\| '_|/ _ \\ \\ /| || |
//      |___/ \\__|\\__,_||_|   \\__||_||_||_|\\__, |  \\_/\\_/ |_| \\__||_||_|\\___/ \\_,_| \\__| /_/ \\_\\|_|  |___| | .__/|_|  \\___//_\\_\\ \\_, |
//                                         |___/                                                           |_|                   |__/

//     `);
//   }

//   return apiHost;
// }

module.exports = (nxConfig, _nxOptions) => {
  console.dir(nxConfig.plugins, 4);
  return merge(nxConfig, myConfig());
  // return merge(nxConfig, {});
};

function myConfig() {
  return {
    resolve: {
      alias: {
        shared: path.resolve(__dirname, 'src/assets/styles/shared.scss')
      }
    },
    plugins: [
      // new HtmlWebpackPlugin({
      //   template: path.resolve(__dirname, 'src/index.html'),
      //   favicon: path.resolve(__dirname, 'src/favicon.ico'),
      //   inject: true
      // }),
      new CleanWebpackPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: [
            {
              loader: '@svgr/webpack'
            }
          ]
        }
      ]
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            compress: true,
            mangle: {
              safari10: true
            },
            output: {
              comments: false,
              ascii_only: true
            },
            warnings: false
          }
        }),
        new CssMinimizerPlugin()
      ],
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    devServer: {
      compress: true,
      historyApiFallback: true,
      open: ['http://localhost:4200/home'],
      liveReload: true,
      client: {
        overlay: true
      },
      proxy: {
        '/api': {
          pathRewrite: { '^/api': '' }
        }
      }
    }
  };
}
