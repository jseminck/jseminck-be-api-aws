import "babel-polyfill";

import configureApp from 'jseminck-be-server';

import configureRoutes from './routes/';

module.exports = configureApp({
    configureServer: () => {}, // There is no specific server configuration
    configureRoutes: configureRoutes
});