const { override, addWebpackAlias, fixBabelImports } = require('customize-cra')
const path = require('path')

module.exports = override(
  addWebpackAlias({
    "@": path.resolve(__dirname, "./src"),
    "@pages": path.resolve(__dirname, "./src/pages"),
    "@components": path.resolve(__dirname, "./src/components"),
    "@request": path.resolve(__dirname, "./src/request"),
    "@ts-rules": path.resolve(__dirname, "./src/ts-rules"),
    "@styles": path.resolve(__dirname, "./src/styles"),
  }),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
)