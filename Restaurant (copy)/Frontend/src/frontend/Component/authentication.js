import React from 'react';

export const Authenticate =(data,next)=>{
    
    if(typeof window !== "undefined"){
        localStorage.setItem('jwt',JSON.stringify(data.token));
        localStorage.setItem('user',JSON.stringify(data.user));
    }
    
}

export const isAuthenticated=()=>{
    if(typeof window == "undefined"){
        return false;
     }
     if(localStorage.getItem('jwt')){
         return  JSON.stringify(localStorage.getItem('jwt'));
     }
     else{
        return false;
     }
}

export const AuthenticateVerififcation =(data)=>{
    if(localStorage.getItem('mail')){
        return  JSON.stringify(localStorage.getItem('mail'));
    }
    else{
        return false;
    }
    
}


