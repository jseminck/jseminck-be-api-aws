"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = configureMongo;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureMongo() {
    var mongo = process.env.JSEMINCK_BE_DB;

    // mongoose.set('debug', true);

    console.log("Connecting to: " + mongo); // eslint-disable-line no-console
    _mongoose2.default.connect(mongo, function (err) {
        if (err) throw err;
        console.log("Connected to the database..."); // eslint-disable-line no-console
    });
}