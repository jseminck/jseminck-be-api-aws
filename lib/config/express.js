import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';

export default function configureExpress (app) {
    app.use(express.static(path.join(__dirname, '../static')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(morgan('dev'));
    app.set('jwtKey', process.env.JSEMINCK_BE_KEY);
}
