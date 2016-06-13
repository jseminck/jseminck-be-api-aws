import configureAwsRoutes from './aws';
import configureAuthenticationRoutes from './authentication';

export default function configureRoutes (app) {
    configureAuthenticationRoutes(app);
    configureAwsRoutes(app);
}
