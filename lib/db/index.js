import pgp from 'pg-promise';

var cn = {
    host: 'localhost',
    port: 5432,
    database: 'aws',
    username: 'postgres',
    password: ''
};

<<<<<<< HEAD
console.log(`Connecting to: ${process.env.DATABASE_URL || cn}`);

export default pgp()(process.env.DATABASE_URL || cn);
=======
export default pgp()(cn);
>>>>>>> 8678a855d7fe8e45617263eec455cecf5d13a327
