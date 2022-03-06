const { createProxyMiddleware } = require('http-proxy-middleware');
     
module.exports = function(app) {
    app.use(createProxyMiddleware('/api/**', { target: 'https://react-node-app-db.herokuapp.com' }));

};

// https://react-node-app-db.herokuapp.com