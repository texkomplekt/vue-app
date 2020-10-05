module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `@import "src/assets/styles/element-variables.scss";`
            }
        }
    },
    parallel: false,
};