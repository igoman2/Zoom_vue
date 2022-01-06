/* vue.config.js */
const path = require("path");
const PrerenderSpaPlugin = require("prerender-spa-plugin");

const productionPlugins = [
  new PrerenderSpaPlugin({
    staticDir: path.join(__dirname, "dist"),
    routes: [",", "/main"],
    renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
      renderAfterElementExists: "#app",
    }),
  }),
];

module.exports = {
  lintOnSave: false,
  transpileDependencies: ["vuetify"],
  chainWebpack: (config) => {
    config.output.chunkFilename(`[id].[chunkhash:8].js`);
    config.plugins.delete("prefetch");
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.plugins.push(...productionPlugins);
    }
  },
};
