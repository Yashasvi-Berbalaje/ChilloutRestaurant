const express=require('express');
const mysqlConnection=require('../DatabaseConnection');
const Router=express.Router();
const {isSignedIn}=require('./protectedRoute');

Router.post('/Reservation',isSignedIn,(req,res)=>{
    console.log(req.body);
     const ReservationQuery=`INSERT INTO Reservation(FirstName,LastName,Email,NumberOfPeople,Phone,Message,Date,Time,USERID) VALUES('${req.body.Firstname}','${req.body.Lastname}','${req.body.email}',${req.body.NoOfPeople},${req.body.Phone},'${req.body.Message}',${req.body.Date},${req.body.Time},${req.body.ID})`
    mysqlConnection.query(ReservationQuery,(err,result)=>{
        if(err){
            console.log(err);
            res.send({
                reservation:false,
                message:'Failed to connect with Database!'
            })
        }
        else{
            res.send({
                reservation:true,
                message:'Reservation for a Table Confirmed!'
            })
        }
    })
})


Router.post('/Order',isSignedIn,(req,res)=>{
    console.log(req.body);
     const OrderQuery=`INSERT INTO Orders(FirstName,LastName,Email,Phone,Item,Quantity,Address,USERID,price) VALUES('${req.body.Firstname}','${req.body.Lastname}','${req.body.email}',${req.body.phone},'${req.body.Item}',${req.body.Quantity},'${req.body.Address}',${req.body.ID},${req.body.price})`
    mysqlConnection.query(OrderQuery,(err,result)=>{
        if(err){
            res.send({
                order:false,
                message:'Failed to connect with Database!'
            })
        }
        else{
            res.send({
                order:true,
                message:'Order Confirmed!'
            })
        }
    })
})


module.exports=Router