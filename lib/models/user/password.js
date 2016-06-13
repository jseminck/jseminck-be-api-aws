import bcrypt from 'bcrypt';

export function generate(password) {
    return new Promise(resolve => bcrypt.hash(password, 10, (err, hash) => {
        resolve(hash);
    }));
}

export function verify(password, encryptedPassword) {
    return new Promise(resolve => bcrypt.compare(password, encryptedPassword, (err, equal) => {
        resolve(equal);
    }));
}
