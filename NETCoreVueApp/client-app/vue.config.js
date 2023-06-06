// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Vejdirektoratet - end ud";
      return args;
    });
  },
  pwa: {
    name: "Vejdirektoratet - Brugerstyring",
  },
  lintOnSave: true,
  devServer: {
    proxy: {
      "/config": {
        target: "https://localhost:8080",
        secure: false,
        pathRewrite: {
          "^/config": "config.json",
        },
      },
    },
    https: true,
  },
};
