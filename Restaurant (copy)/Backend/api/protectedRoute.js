
var expressJwt = require('express-jwt');
exports.isSignedIn=expressJwt(
    {
    secret:"SecretKey",
    algorithms: ['HS256'],
    userProperty:'auth'
    
});