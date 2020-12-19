import React from 'react';
import '../scss/verification.scss';
import 'bootstrap/dist/css/bootstrap.css';
import ReactNotification from 'react-notifications-component';
import {Notification} from './Notification';

export default function Verification() {
     const handleOTP=(event)=>{
		 event.preventDefault();
        if(!event.target.otp.value.trim()){
			Notification({
				title:'Error',
				message:'Please fill all the fields',
				type:'danger'
			})
		}
		else{
           if(localStorage.getItem('mail')){
			const otpDetails={
				email:JSON.parse(localStorage.getItem('mail')),
				otp:parseInt(event.target.otp.value) 
			}
			fetch('http://localhost:8000/verification/confirmAccount',{
				method:'POST',
				headers:{ 
					'Content-Type': 'application/json',
					Accept:'application/json'
			 },
			 body:JSON.stringify(otpDetails)
			}).then(response=>{
				response.json().then(data=>{
					if(data.verification===false){
						Notification({
							title:'Failed',
							message:`${data.message}`,
							type:'danger'
						}) 
					}
					else{
						Notification({
							title:'Success',
							message:`${data.message}`,
							type:'success'
						})
						localStorage.clear();
						window.location='/login';
					}
				})
			}).catch(err=>{
				console.log(err);
			})
		   }
		   else{
			Notification({
				title:'Failed',
				message:`Access denied`,
				type:'danger'
			}) 
		   }
			
		}

	 }

	 const handleResendOtp=()=>{
		if(localStorage.getItem('mail')){
			const otpDetails={
				email:JSON.parse(localStorage.getItem('mail')),
			}
			fetch('http://localhost:8000/verification/resendOtp',{
				method:'POST',
				headers:{ 
					'Content-Type': 'application/json',
					Accept:'application/json'
			 },
			 body:JSON.stringify(otpDetails)
			}).then(response=>{
				response.json().then(data=>{
					if(data.resendotp===false){
						Notification({
							title:'Failed',
							message:`${data.message}`,
							type:'danger'
						}) 
					}
					else{
						Notification({
							title:'Success',
							message:`${data.message}`,
							type:'success'
						})
					}
				})
			}).catch(err=>{
				console.log(err);
			})
		   }
		   else{
			Notification({
				title:'Failed',
				message:`Access denied`,
				type:'danger'
			}) 
		   }

	 }
    return (
     <div className='login-back bg-dark mb-0'>
		 <ReactNotification isMobile='true' breakpoint='700px'/> 
		 <div className='w-100'>
		 </div>
		 <h1 className='logo-login mb-0 font-weight-bold text-white'>CHILL OUT</h1>
		 <h3 className='heading-login mb-3 font-weight-bold text-white'>Restaurant</h3>
				<div className={`LoginContainer p-5`} id="container">	
		        <h1 className='heading-login mb-0 font-weight-bold text-dark p-5 text-center'>Verification</h1>
                <h6 className='heading-login mb-3 font-weight-bold text-dark text-center'>Enter the otp sent to this email {JSON.parse(localStorage.getItem('mail'))} </h6>
				<form onSubmit={handleOTP}>
				<input className='login-input' type="number" name='otp' placeholder="Enter the otp" />
                <div className='w-100 d-flex justify-content-center'>
			   
                <button type="submit" className='login-button m-3'>Confirm Verification</button>
                </div>	
				</form>
				<div className="d-flex justify-content-center">
				<button onClick={()=>handleResendOtp()} style={{border:'0px',background:'transparent',outline:'none'}}>Didnt Recieve? Resend otp</button>
				</div>
				</div>
		 </div>
    )
}
