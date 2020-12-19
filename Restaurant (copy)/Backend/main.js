const express=require('express');
const app=express();
var cor =require('cors');
var cookieParser = require('cookie-parser')
const bodyParser=require('body-parser');
const FeedBackRoute=require('./api/message');
const ServiceRoute=require('./api/service');
const AuthRoute =require('./api/auth');
const VerifcationRoute =require('./api/verification');
const ResetPassword =require('./api/resetPassword');
app.use(cor());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/FeedBack',FeedBackRoute);
app.use('/Auth',AuthRoute);
app.use('/Service',ServiceRoute);
app.use('/verification',VerifcationRoute);
app.use('/resetpassword',ResetPassword);

app.use(function(err, req, res, next) {
    if(err.name === 'UnauthorizedError') {
      res.status(err.status).send({message:"Access Denied"});
      return;
    }
 next();
});

app.listen('8000',()=>{
    console.log('Server is running at port 8000.....');
})