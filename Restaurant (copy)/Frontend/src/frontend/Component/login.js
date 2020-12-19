import React, { useState } from 'react';
import '../scss/login.scss';
import 'bootstrap/dist/css/bootstrap.css';
import ReactNotification from 'react-notifications-component';
import {Notification} from './Notification';
import {Authenticate,isAuthenticated,AuthenticateVerififcation} from './authentication';
import {Redirect,history} from 'react-router-dom';

export default function Login() {
	const [SignUp, setSignUp] = useState(false);
	const handleFormSignUp=(event)=>{
		 event.preventDefault();
		 const RegisterDetails={
			name:event.target.Name.value,
			email:event.target.Email.value,
			password:event.target.Password.value
		}
		 if(!event.target.Name.value.trim()||!event.target.Email.value.trim()||!event.target.Password.value.trim()||!event.target.ConfirmPassword.value.trim()){
			Notification({
				title:'Error',
				message:'Please fill all the fields',
				type:'danger'
			})
		  }
		  else{
              if(event.target.Password.value.length<6){
				Notification({
					title:'Error',
					message:'Password Length must be greater than 6',
					type:'danger'
				})  
			  }
			 else if(event.target.Password.value!==event.target.ConfirmPassword.value){
				Notification({
					title:'Error',
					message:'Password Does Not Matches...',
					type:'danger'
				}) 
			  }
			  
			  else{
		        fetch('http://localhost:8000/Auth/register',{
					method:'POST',
					headers:{ 
						'Content-Type': 'application/json',
						Accept:'application/json'
				 },
					body:JSON.stringify(RegisterDetails)
				}).then((res)=>{
                      res.json().then((data)=>{
						  if(data.AccountRegistered===true){
							Notification({
								title:'Success',
								message:`${data.message}`,
								type:'success'
							})
							localStorage.setItem('mail',JSON.stringify(data.email));
							window.location='/verification';
						  }
						  else{
							Notification({
								title:'Failed',
								message:`${data.message}`,
								type:'danger'
							}) 
						  }
					  })
				}).catch((err)=>{
					Notification({
						title:'Failed',
						message:`Failed to Create Account`,
						type:'danger'
					})
				})                
			  }
		  }
	    

	}

	const handleFormSignIn=(event)=>{
		event.preventDefault();
		const LoginDetails={
		   email:event.target.Email.value,
		   password:event.target.Password.value
	   }
		if(!event.target.Email.value.trim()||!event.target.Password.value.trim()){
		   Notification({
			   title:'Error',
			   message:'Please fill all the fields',
			   type:'danger'
		   })
		 }
		 else{
			   fetch('http://localhost:8000/Auth/login',{
				   method:'POST',
				   headers:{ 
					'Content-Type': 'application/json',
					Accept:'application/json'
			        },
				   body:JSON.stringify(LoginDetails)
			   }).then((res)=>{
					 res.json().then((data)=>{
						 if(data.LoginAuth===true){
						   Notification({
							   title:'Success',
							   message:`${data.message}`,
							   type:'success'
						   })
						   Authenticate(data)
						   //window.location='/home'
						   if(isAuthenticated()){
							window.location='/home';
						   }
						  
						 }
						 else {
							if(data.LoginAuth===false && data.verification===true){
								Notification({
									title:'Failed',
									message:`${data.message}`,
									type:'danger'
								}) 
								localStorage.setItem('mail',JSON.stringify(data.user.email));
								window.location='/verification'
							}else{
								Notification({
									title:'Failed',
									message:`${data.message}`,
									type:'danger'
								}) 
							}
						   
						 }
					 })
			   }).catch((err)=>{
				   Notification({
					   title:'Failed',
					   message:`Failed to Log In`,
					   type:'danger'
				   })
			   })                
			 }
		 
	   

   }
   
    return (
     <div className='login-back bg-dark mb-0'>
		 {localStorage.clear()}
		 <ReactNotification isMobile='true' breakpoint='700px'/> 
		 <div className='w-100'>
		 <h6 className='heading-login mb-0 text-white float-right'><small>Project Developed By Sushan-Vishal-Yashasvi</small></h6>
		 </div>
		 <h1 className='logo-login mb-0 font-weight-bold text-white'>CHILL OUT</h1>
		 <h3 className='heading-login mb-3 font-weight-bold text-white'>Restaurant</h3>
				<div className={`LoginContainer ${SignUp===true&&'right-panel-active'}`} id="container">
					<div className="form-container sign-up-container">
						<form onSubmit={handleFormSignUp} className='login-form'>
							<h1 className='heading-login'>Create Account</h1>			
							<input className='login-input' type="text" name='Name' placeholder="Name" />
							<input className='login-input' type="email" name='Email' placeholder="Email" />
							<input className='login-input' type="password" name='Password' placeholder="Password" />
							<input className='login-input' type="password" name='ConfirmPassword' placeholder="Confirm Password" />
							<button type='submit' className='login-button mt-3'>Sign Up</button>
						</form>
					</div>
					<div className="form-container sign-in-container">
						<form onSubmit={handleFormSignIn} className='login-form'>
							<h1 className='heading-login'>Sign in</h1>	
							<input className='login-input' type="email" name='Email' placeholder="Email" />
							<input className='login-input' type="password" name='Password' placeholder="Password" />
							<a className='login-anchor' href="/resetPassword">Forgot your password?</a>
							<button type='submit' className='login-button'>Sign In</button>
						</form>
					</div>
					<div className="overlay-container">
						<div className="overlay">
							<div className="overlay-panel overlay-left">
								<h1 className='heading-login'>Welcome Back!</h1>
								<p className='login-para'>To keep connected with us please login with your personal info</p>
								<button className="ghost login-button" id="signIn"onClick={()=>(
									setSignUp(false)
								)}>Sign In</button>
							</div>
							<div className="overlay-panel overlay-right">
								<h1 className='heading-login'>Hello, Friend!</h1>
								<p>Enter your personal details and start journey with us</p>
								<button className="ghost login-button" id="signUp" onClick={()=>(
									setSignUp(true)
								)}>Sign Up</button>
								
							</div>
						</div>
						
					</div>
				</div>
		 </div>
    )
}


