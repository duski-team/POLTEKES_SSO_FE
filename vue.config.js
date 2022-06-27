// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-jest")
      .tap((options) => {
        return options })}}
