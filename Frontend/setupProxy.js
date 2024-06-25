module.exports = function (app) {
    app.use(
        '/api',
        proxy({
            target: 'http://192.168.100.102:3001',
            changeOrigin: true,
            pathRewrite: { '^/api': '' },
        }),
    );
};