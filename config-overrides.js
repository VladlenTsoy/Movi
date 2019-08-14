const path = require('path');
const {override, fixBabelImports, addLessLoader, addBundleVisualizer, addWebpackAlias} = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#24BAEF',
            '@link-color': '#24BAEF',
            '@text-color-secondary': 'rgba(255, 255, 255, 0.4)',
            '@text-color': 'rgba(255, 255, 255, 0.6)',


            '@bg-empty-color': '#292b33',
            '@text-secondary': 'rgba(255, 255, 255, 0.4)',
            '@font-family': '\'Montserrat\', sans-serif',
        },
    }),
    addBundleVisualizer({}, true),
    addWebpackAlias({
        "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/assets/icons/icons.js")
    })
);
