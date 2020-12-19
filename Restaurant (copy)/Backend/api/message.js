const express=require('express');
const mysqlConnection=require('../DatabaseConnection');
const {isSignedIn}=require('./protectedRoute');

const Router=express.Router();

Router.post('/sendFeedBack',isSignedIn,(req,res)=>{
      const SendMessageQuery=`INSERT INTO FeedBack VALUES('${req.body.name}','${req.body.email}','${req.body.message}')`
      mysqlConnection.query(SendMessageQuery,(err,results,feilds)=>{
          if(err) {
              res.send(err);
          };
          res.send({
              sent:true,
              message:'Thank you, message sent Successfully..'
          });
      })
})
module.exports=Router;