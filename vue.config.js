module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
      ? './'
      : '/',
  // 配置Webpack
  productionSourceMap: false // 去除生产环境的sourcemap
}
