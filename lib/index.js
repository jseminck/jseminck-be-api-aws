import "babel-polyfill";

import express from 'express';

import configureServer from './config/';
import configureRoutes from './routes/';

const app = express();

configureServer(app);
configureRoutes(app);

<<<<<<< HEAD
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

app.listen(port);
console.log(`Server running at http://127.0.0.1:${port}`); // eslint-disable-line no-console
=======
app.listen(1337);
console.log('Server running at http://127.0.0.1:1337/'); // eslint-disable-line no-console
>>>>>>> 8678a855d7fe8e45617263eec455cecf5d13a327

module.exports = app;
