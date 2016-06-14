import jwt from 'jsonwebtoken';

/**
 * Helper function to validate a json web token.
 */
export default function verifyJwtToken(req, res, app) {
    const {key: requestKey, token: requestToken} = req.query;
    const {key: bodyKey, token: bodyToken} = req.body;


    if (!requestKey && !bodyKey && !requestToken && !bodyToken) {
        return {
            success: false,
            message: "Please provide a key: ?key= or ?token="
        };
    }

    try {
         jwt.verify(requestKey || bodyKey || requestToken || bodyToken, app.get('jwtKey'));
    } catch(err) {
        return {
            success: false,
            message: "Incorrect key"
        };
    }

    return {
        success: true
    };
}