module.exports = {
  devServer: {
    host: '127.0.0.1',
    port: 8081,
    hot: false,
    open: true,
    proxy: {
      '/api': {
        target: 'https://api.muxiaoguo.cn/api/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  }
}