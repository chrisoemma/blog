const express = require('express');
const app = express();
const RoutePosts = require('./routes/api/posts');
const DbConnection = require('./database/connection');
const bodyParser = require('body-parser');

//extract the entire body of incoming request and allocate it to req.body 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//prevent cors errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT,PATCH,POST,GET,DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use('/api/v1/posts', RoutePosts);
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