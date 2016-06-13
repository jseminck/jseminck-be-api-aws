import jwt from 'jsonwebtoken';
import * as User from './../models/User';
import * as Password from './../models/user/password';
import verifyJwtToken from './../util/verifyJwtToken';

async function post (req, res) {
    const {username, password} = req.body;

    try {
        let user = await User.findOneByUsername({username: username});


        if (!user) {
            return res.status(500).send({
                success: false,
                message: 'User has not been found.',
                errorFields: ['username', 'password']
            });
        }

        const passwordEqual = await Password.verify(password, user.password);

        if (!passwordEqual) {
            return res.status(401).send({
                success: false,
                message: 'Incorrect password',
                errorFields: ['password']
            });
        }

        const token = jwt.sign(user, this.get('jwtKey'), {
            expiresIn: 3600
        });

        await User.updateLastLogin({username: user.username});

        return res.send({
            success: true,
            message: 'You have been logged in!',
            username: user.username,
            token: token
        });
    } catch (err) {
        return res.status(500).send({err: err});
    }
}

function verify(req, res) {
    const verifiedKey = verifyJwtToken(req, res, this);

    if (verifiedKey.success) {
        res.status(200).send(verifiedKey);
    } else {
        res.status(500).send(verifiedKey);
    }
}

export default function configureAuthenticationRoutes (app) {
    app.route('/api/login')
        .post(post.bind(app));

    app.route('/api/login/verify')
        .get(verify.bind(app));
}
