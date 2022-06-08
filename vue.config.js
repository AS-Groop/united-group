const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    i18n: {
      locale: 'ru',
      fallbackLocale: 'uz_lat',
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    }
  },
  devServer:{
    proxy: {
      "^/v1": {
        target: 'https://internal.lhbrokerage.com',
        changeOrigin: true,
      }
    }
  }
})
