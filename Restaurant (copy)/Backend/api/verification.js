const express=require('express');
const mysqlConnection=require('../DatabaseConnection');
const Router=express.Router();
const nodemailer = require('nodemailer');


Router.post('/confirmAccount',(req,res)=>{
    console.log(req.body);
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
                        verification:false,
                        message:'OTP is Expired'
                    })
                }
                else if(result[0].OTP===RequestedOtp){
                    res.send({
                        verification:true,
                        message:'Your Account verified Successfully,Please Login To enjoy our Service!'
                    })
                    mysqlConnection.query(`UPDATE Users SET Verification=1,OTP=NULL WHERE Email="${email}"`,(err,otpSetNull)=>{
                        if(err){
                            throw err;
                        }
                        else{
                            console.log('Otp set to null Successfully!')
                        }
                    })
                }
                else{
                    res.send({
                        verification:false,
                        message:'failed To verify your Account!'
                    }) 
                    mysqlConnection.query(`UPDATE Users SET OTP=NULL WHERE Email="${email}"`,(err,otpSetNull)=>{
                        if(err){
                            throw err;
                        }
                        else{
                            console.log('Otp set to null Successfully!')
                        }
                    })
                }
            }
        }
    })
})


Router.post('/resendOtp',(req,res)=>{
    var email=req.body.email;
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
            res.send({
                resendotp:false,
                message:'Failed to send otp'
            })
        }
        else{
            mysqlConnection.query(`UPDATE Users SET OTP=${otp} WHERE Email='${email}';  
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
})


module.exports=Router;