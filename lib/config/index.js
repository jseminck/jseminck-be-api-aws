import configureExpress from './express';
import configureCors from './cors';
import configureData from './data';
import env2 from 'env2';

export default function configure (app) {
    env2('config.env'); // Load all environment variables

    configureExpress(app);
    configureCors(app);
    configureData();
}