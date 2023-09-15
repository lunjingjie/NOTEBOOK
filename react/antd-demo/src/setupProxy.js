const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		createProxyMiddleware('/api', {
			target: 'http://172.68.1.125:16000',
			changeOrigin: true,
			pathRewrite: { '^/api': '' }
		})
	);
};
