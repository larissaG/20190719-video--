const webpack = require("webpack");
// const path = require("path");

// function addStyleResource(rule) {
//   rule
//     .use("style-resource")
//     .loader("style-resources-loader")
//     .options({
//       patterns: [path.resolve(__dirname, "./src/styles/var.less")]
//     });
// }
module.exports = {
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require("postcss-px2rem")({
            remUnit: 75
          })
        ]
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        _: "lodash"
      })
    ]
  },
};
