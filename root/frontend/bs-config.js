module.exports = {
    server: {
        baseDir: "./",
        middleware: {
            1: require('connect-history-api-fallback')({
                index: '/index.html',
                verbose: true
            })
        }
    },
    port: 80,
    files: ["*.html", "*.css", "*.js"]
};
