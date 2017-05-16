module.exports = {
  context: __dirname + "/app",
  entry: './app.ts',
  output: {
    filename: './app/bundle.js'
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    loaders: [
      { test: /.ts$/, loader: 'awesome-typescript-loader' }
    ]
  }
};