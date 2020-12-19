import React, { useState } from 'react';
import '../scss/resetPassword.scss';
import 'bootstrap/dist/css/bootstrap.css';
import ReactNotification from 'react-notifications-component';
import {Notification} from './Notification';

export default function ResetPassword() {
	const [email, setEmail] = useState("");
	const [emailInput, setEmailInput] = useState(true);
	const [otpInput, setotpInput] = useState(false);
	const [passwordInput, setpasswordInput] = useState(false);
	
	const handleEmail=(event)=>{
		event.preventDefault();
		if(!event.target.email.value.trim()){
			Notification({
				title:'Error',
				message:'Please fill all the fields',
				type:'danger'
			})
		}
		else{
			const EmailDetails={
				email:event.target.email.value,
			}
			fetch('http://localhost:8000/resetpassword/checkEmail',{
				method:'POST',
				headers:{ 
					'Content-Type': 'application/json',
					Accept:'application/json'
					},
				body:JSON.stringify(EmailDetails)
			}).then(response=>{
				response.json().then(data=>{
					if(data.emailexists===true){
						setEmail(data.recoverymail);
						setEmailInput(false);
						setotpInput(true);
						Notification({
							title:'Success',
							message:`${data.message}`,
							type:'success'
						})
					}
					else{
						Notification({
							title:'Error',
							message:data.message,
							type:'danger'
						})
					}
				})
			}).catch(err=>{
				console.log(err)
			})
		}
	}
	const handleotp=(event)=>{
		event.preventDefault();
		if(!event.target.otp.value.trim()){
			Notification({
				title:'Error',
				message:'Please fill all the fields',
				type:'danger'
			})
		}
		else{
			const otpDetails={
				email:email,
				otp:parseInt(event.target.otp.value)
			}
			fetch('http://localhost:8000/resetpassword/confirmOtp',{
				method:'POST',
				headers:{ 
					'Content-Type': 'application/json',
					Accept:'application/json'
					},
				body:JSON.stringify(otpDetails)
			}).then(response=>{
				response.json().then(data=>{
					if(data.ConfirmationOtp===true){
						console.log(email)
						setEmailInput(false);
						setotpInput(false);
						setpasswordInput(true)
						Notification({
							title:'Success',
							message:`${data.message}`,
							type:'success'
						})
					}
					else{
						Notification({
							title:'Error',
							message:data.message,
							type:'danger'
						})
					}
				})
			}).catch(err=>{
				console.log(err)
			})
		}
	}
	const handleupdatePassword=(event)=>{
		event.preventDefault();
		if(!event.target.password.value.trim()||!event.target.confirmpassword.value.trim()){
			Notification({
				title:'Error',
				message:'Please fill all the fields',
				type:'danger'
			})
		}
		else if(event.target.password.value.length<6){
			Notification({
				title:'Error',
				message:'Password Length must be greater than 6',
				type:'danger'
			})  
		  }
		 else if(event.target.password.value!==event.target.confirmpassword.value){
			Notification({
				title:'Error',
				message:'Password Does Not Matches...',
				type:'danger'
			}) 
		  }
		else{
			const passwordDetails={
				email:email,
				password:event.target.password.value
			}
			fetch('http://localhost:8000/resetpassword/updatePassword',{
				method:'POST',
				headers:{ 
					'Content-Type': 'application/json',
					Accept:'application/json'
					},
				body:JSON.stringify(passwordDetails)
			}).then(response=>{
				response.json().then(data=>{
					if(data.updatePassword===true){
						console.log(email)
					    Notification({
							title:'Success',
							message:`${data.message}`,
							type:'success'
						})
						window.location='/login';
					}
					else{
						Notification({
							title:'Error',
							message:'Failed to Change Password',
							type:'danger'
						})
					}
				})
			}).catch(err=>{
				console.log(err)
			})
		}
	}



    return (
     <div className='login-back bg-dark mb-0' style={{minHeight:'700px'}}>
		 <ReactNotification isMobile='true' breakpoint='700px'/> 
		 <h1 className='logo-login mb-0 font-weight-bold text-white'>CHILL OUT</h1>
		 <h3 className='heading-login mb-3 font-weight-bold text-white'>Restaurant</h3>
				<div className={`LoginContainer p-5`} id="container" style={{minHeight:'200px'}}>
					
		        <h1 className='heading-login mb-0 font-weight-bold text-dark p-2 text-center'>Reset Password</h1>

				{emailInput===true&&
					<form onSubmit={handleEmail}>
					<input className='login-input' type="email" name='email' placeholder="Enter the registered email adress" />
					<div className='w-100 d-flex justify-content-center'>
					<button type='submit' className='login-button m-3'>Confirm Email</button>
					</div>
					</form>
				}
				{otpInput===true&&
					<form onSubmit={handleotp}>
					<input className='login-input ' type="number"  name='otp' placeholder="Enter the otp" />
					<div className='w-100 d-flex justify-content-center'>
					<button type='submit' className='login-button m-3'>Confirm OTP</button>
					</div>
					</form>
				}
				{passwordInput===true&&
					<form onSubmit={handleupdatePassword}>
					<input className='login-input' type="password" name='password'  placeholder="Password" />
				    <input className='login-input' type="password" name='confirmpassword'  placeholder="Confirm Password" />
					<div className='w-100 d-flex justify-content-center'>
					<button type={"submit"} className='login-button m-3'>Update Password</button>
					</div>
					</form>
				}
		
				
               
                	
				</div>
		 </div>
    )
}
