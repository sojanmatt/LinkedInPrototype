'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
//var db = require('../app/db');
var Model = require('../model/linkedin');
//var config = require('./settings');
const secret = "secret";

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {

        Model.findOne({ 
            'user.email': jwt_payload.email 
        }, (err, res) => {

                if (res) {
                    var user = res.user.email;
                    //delete user.user.password;
                    console.log('Session Email: ', user.email);
                    callback(null, user.email);
                }
                else {
                    callback(err, false);
                }
            });
    }));
};
