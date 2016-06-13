import jwt from 'jsonwebtoken';

/**
 * Helper function to validate a json web token.
 */
export default function verifyJwtToken(req, res, app) {
    const {key: requestKey} = req.query;
    const {key: bodyKey} = req.body;


    if (!requestKey && !bodyKey) {
        return {
            success: false,
            message: "Please provide a key"
        };
    }

    try {
         jwt.verify(requestKey || bodyKey, app.get('jwtKey'));
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