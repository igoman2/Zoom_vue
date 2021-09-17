module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
      config.output.chunkFilename(`[id].[chunkhash:8].js`);
      config.plugins.delete('prefetch');
  },
};
