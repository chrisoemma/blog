const express = require('express');
const app = express();
const RoutePosts = require('./routes/api/posts');
//console.log('every thing can start');

//app.use('/api/v1/posts',RoutePosts);
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            code: error.status,
            message: error.message,
            stack: error.stack
        }
    });
});

module.exports = app;