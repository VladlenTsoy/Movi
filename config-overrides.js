const {override, fixBabelImports, addLessLoader} = require('customize-cra');

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
            '@bg-empty-color': '#292b33',
            '@text-secondary': 'rgba(255, 255, 255, 0.4)',
            // '@font-family': '\'Open Sans\', sans-serif',
            // '@font-family': '\'Avenir Next Cyr\', sans-serif',
            '@font-family': '\'Montserrat\', sans-serif',
        },
    })
);
