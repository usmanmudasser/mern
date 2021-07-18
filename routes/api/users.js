const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load user model
const User = require('../../models/User');


// @route   POST /api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (request,response)=> {
  User.findOne({email: request.body.email})
        .then(user=>{
          if(user){
            return response.status(400).json({email: "Email already exists."});
          }
          else
          {
           const avatar= gravatar.url(request.body.email, {
             s:'200', // size
             r: 'pg', //rating
             d: 'mm' //default image
            });
            const newUser = new User({
              name: request.body.name,
              email:  request.body.email,              
              password: request.body.password,
              avatar:avatar
            });

            bcrypt.genSalt(10, (err, salt)=>
            {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err)throw err;                
                else
                {
                  newUser.password = hash;
                  newUser.save()
                          .then(user=> response.json(user))
                          .catch(error=> console.log(error));
                }
              })
            });
          }
        });

});

// @route   POST /api/users/login
// @desc    Login User / Returning JWT token
// @access  Public
router.post('/login', (request, response) => {
  const email = request.body.email;
  const password = request.body.password;

  User.findOne({email})
        .then(user => {
          if(!user)
          {
            return response.status(404).json({email: 'User not found'});
          }

          //Check Password
          bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch)
                    {
                      
                      //Create payload for JWT sign operation
                      const payload = {
                        id: user.id,
                        name: user.name,                        
                        avatar: user.avatar
                      };

                      //Sign token  
                      jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {expiresIn: 3600}, 
                        (err, token) =>{
                          response.json(
                            {
                              success: true,
                              token: 'Bearer ' + token
                            }
                          );
                        }
                      );
                    }
                    else
                    {
                      response.status(400).json({password: 'Invalid credentials.'})
                    }
                });
        });


});


// @route   GET /api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (request,response) => {
    response.json(request.user);
  }
 );

module.exports = router;