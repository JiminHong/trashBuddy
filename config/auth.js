// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '1618618955065019', // your App ID
        'clientSecret'    : '65f343a9d9db5826cc24338e99c44b99', // your App Secret
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'        : 'lZJ7L8wuNZAUzTjdPmBLsONYq',
        'consumerSecret'     : '3EJQPg1Sfl8v6pK3qw7MFxLtBBDfeZUBNVCmbj5oRfIbcL2O2c',
        'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : 'your-secret-clientID-here',
        'clientSecret'     : 'your-client-secret-here',
        'callbackURL'      : 'http://localhost:8080/auth/google/callback'
    }

};
