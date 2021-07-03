const path = require("path");

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: [ /node_modules/, /dist/, /deno/, /test/ ]
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  experiments: {
    outputModule: true
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'deno'),
    library: {
      type: 'module',
    }
  }
}
