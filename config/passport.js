const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

module.exports = passport => {

  
  passport.use(
    new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey   : keys.secretOrKey
    },
    (jwt_payload,done)=>
      {
          console.log(jwt_payload);

          User.findById(jwt_payload.id)
              .then(user=> {
                if(user)
                {
                  return done(null,user);
                }
                else
                {
                  return done(null,false);
                }
              })
              .catch(err => console.log(err));
      })
  );
}
