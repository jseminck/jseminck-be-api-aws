import pgp from 'pg-promise';

var cn = {
    host: 'localhost',
    port: 5432,
    database: 'aws',
    username: 'postgres',
    password: ''
};

export default pgp()(process.env.DATABASE_URL || cn);