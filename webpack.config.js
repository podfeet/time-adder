// Webpack install and config from PBS 138
// https://pbs.bartificer.net/pbs138

// Needed hackery to get __filename and __dirname in ES6 mode
// see: https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-js-when-using-es6-modules
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// import the Webpack copy plugin
import CopyPlugin from 'copy-webpack-plugin';

// export the Webpack config
export default {
  entry: './src/index-body.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {from: 'src/index.html', to: 'index.html'}
      ],
    }),
  ],
};
