'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = verifyJwtToken;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Helper function to validate a json web token.
 */
function verifyJwtToken(req, res, app) {
    var requestKey = req.query.key;
    var bodyKey = req.body.key;


    if (!requestKey && !bodyKey) {
        return {
            success: false,
            message: "Please provide a key"
        };
    }

    try {
        _jsonwebtoken2.default.verify(requestKey || bodyKey, app.get('jwtKey'));
    } catch (err) {
        return {
            success: false,
            message: "Incorrect key"
        };
    }

    return {
        success: true
    };
}