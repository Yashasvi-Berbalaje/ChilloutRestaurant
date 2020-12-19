const express=require('express');
const mysqlConnection=require('../DatabaseConnection');
const Router=express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');


Router.post('/checkEmail',(req,res)=>{
    var email=req.body.email;
    mysqlConnection.query(`SELECT * FROM Users WHERE Email="${email}"`,(err,result)=>{
        console.log(result)
        if(err){
            throw err;
        }
        else{
            if(result.length!==0){
              
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
                to:`${result[0].Email}`,
                subject:'Sending mail for testing..',
                text:`Thank You For Registration! Plase Confirm the Verififcation Code
                Your Verification Code is : ${otp}`
            };
            transporter.sendMail(mailoption,function(err,info){
                if(err){
                    res.send({
                        resendotp:false,
                        message:'Failed to send otp'
                    })
                }
                else{
                    mysqlConnection.query(`UPDATE Users SET OTP=${otp} WHERE Email='${result[0].Email}';  
                    `,(err,otpUpdate)=>{
                        if(err){
                            throw err;
                        }
                        else{
                            console.log('updated otp in database and valid for 1 min')
                        }
                    })
                    res.send({
                        resendotp:true,
                        message:`Otp Sent Successfully to ${email}`
                    })
                }
            })
            res.send({
                emailexists:true,
                message:`Otp Sent Successfully to ${email}!Please Enter the OTP`,
               recoverymail:result[0].Email 
            })
            

            }
            else{
                res.send({
                    emailexists:false,
                    message:'Email Doesnt Exist!' 
                 }) 
            }
        }
    })
})


Router.post('/confirmOtp',(req,res)=>{
    var email=req.body.email;
    var RequestedOtp=req.body.otp;
    mysqlConnection.query(`SELECT * FROM Users WHERE Email="${email}"`,(err,result)=>{
        console.log(result)
        if(err){
            throw err;
        }
        else{
            if(result[0]){
                if(result[0].OTP===null){
                    res.send({
                        ConfirmationOtp:false,
                        message:'OTP is Expired'
                    })
                }
                else if(result[0].OTP===RequestedOtp){
                    res.send({
                        ConfirmationOtp:true,
                        message:'Otp Confirmed!Please Enter Your Password to Update'
                    })
                }
                else{
                    res.send({
                        ConfirmationOtp:false,
                        message:'Invalid OTP Entry!'
                    }) 
                }
            }
        }
    })
})
Router.post('/updatePassword',(req,res)=>{
    var email=req.body.email;
    var password=req.body.password;
    bcrypt.hash(password,10,(err,hash)=>{
        if(err){
            res.send(err);
        }
        else{
            const UpdatePassorQuery=`UPDATE Users SET Password='${hash}' WHERE Email="${email}"`
            mysqlConnection.query(UpdatePassorQuery,(err,result)=>{
               if(err){
                   throw err;
               }
               else{
                  res.send({
                      updatePassword:true,
                      message:"Password Changed Successfully!",
                      pass:password,
                      hash:hash
                  })

               }
            })
        }
})
})


module.exports=Router;

