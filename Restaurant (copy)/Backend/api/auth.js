const express=require('express');
const mysqlConnection=require('../DatabaseConnection');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const {isSignedIn}=require('./protectedRoute');
const nodemailer = require('nodemailer');

const Router=express.Router();
Router.post('/register',(req,res)=>{
      var username=req.body.name;
      var email=req.body.email;
      var password=req.body.password;
      const checkEmail=`SELECT Email FROM Users WHERE Email='${email}'`
          mysqlConnection.query(checkEmail,(err,result)=>{
              if(err){
                res.send({
                    message:'Failed to connect with Database!'
                })
              }
              else{
                  if(result.length===0){
                    bcrypt.hash(password,10,(err,hash)=>{
                        if(err){
                            res.send(err);
                        }
                        
                      const SendMessageQuery=`INSERT INTO Users(Name,Email,Password) VALUES('${username}','${email}','${hash}')`;
                      mysqlConnection.query(SendMessageQuery,(err,result)=>{
                          if(err){
                            res.send({
                                message:'Failed to connect with Database!'
                            })
                          }
                          else{
                              var transporter=nodemailer.createTransport({
                                  service:'gmail',
                                  auth:{
                                      user: 'chilloutrestaurant2020@gmail.com',
                                      pass:'dummypassword'
                                  }
                              });
                              var otp = Math.floor(1000 + Math.random() * 9000);
                        
                              var mailoption={
                                  from:'chilloutrestaurant2020@gmail.com',
                                  to:`${email}`,
                                  subject:'Sending mail for testing..',
                                  text:`Thank You For Registration! Plase Confirm the Verififcation Code
                                  Your Verification Code is : ${otp}`
                              };
                              transporter.sendMail(mailoption,function(err,info){
                                  if(err){
                                      console.log(err)
                                  }
                                  else{
                                      mysqlConnection.query(`UPDATE Users SET OTP=${otp} WHERE Email='${req.body.email}';  
                                      `,(err,otpUpdate)=>{
                                          if(err){
                                              throw err;
                                          }
                                          else{
                                              console.log('updated otp in database and valid for 1 min')
                                          }
                                      })
                                      console.log('Email Sent Successfully')
                                  }
                              })

                              res.send({
                                  email:req.body.email,
                                  AccountRegistered:true,
                                  message:'Account Created Successfully'
                              })
                          }
                      })
                    });
                  }
                  else{
                      res.send({
                          AccountRegistered:false,
                          message:'Email already Exists! Please Sign In'
                      })
                  }
              }
          })
    
      
})


Router.post('/login',(req,res)=>{
    var email=req.body.email;
    var password=req.body.password;
    var EmailExistQuery=`SELECT * from Users WHERE Email='${email}'`; 
    mysqlConnection.query(EmailExistQuery,(err,result)=>{      
        if(err){
            res.send({
                message:'Failed to connect with Database!'
            })
        }
        else{
            if(result.length===0){
          return res.send({
               LoginAuth:false,
               message:'Email doesnt Exists! Please Sign Up'
           })
        }
        else{
            let hashPass=result[0].Password;
            bcrypt.compare(password, hashPass, function(err, response) {
                if(err){
                    throw err;
                }
                
                else{
                        if(response===true){
                        if(result[0].Verification===0){
                            return  res.send({
                                  LoginAuth:false,
                                  message:'Your Account is not Verified.... Please Verify!',
                                  user:{
                                      Name:result[0].Name,
                                      email:result[0].Email,
                                      id:result[0].ID
                                  },
                                  verification:true
                              }) 
                          }
                        const token=jwt.sign({id:result[0].ID},"SecretKey");
                        res.cookie("token",token,{expire:new Date()+9999});     
                        res.send({
                            LoginAuth:true,
                            message:'Successfully Logged In!',
                            user:{
                                Name:result[0].Name,
                                email:result[0].Email,
                                id:result[0].ID
                            },
                            token:token
                        })
                    }
                    else{
                        res.send({
                            LoginAuth:false,
                            message:'Incorrect Password!',
                            verification:false 
                        })
                    }
                }
            });
        }
        }
    })
})


Router.post('/logout',(req,res)=>{
     res.clearCookie('token');
     res.send({
         message:'Logged Out Successfully!'
     })
})





module.exports=Router;