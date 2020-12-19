import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../scss/getInTouch.scss';
import '../scss/base.scss';
import chef from '../../assets/chef.jpg';
import {Notification} from './Notification';

export default function GetInTouch() {

    const handleMessageForm=(event)=>{ 
        event.preventDefault();
        if(!event.target.Name.value.trim()||!event.target.Email.value.trim()||!event.target.Message.value.trim()){
          Notification({
              title:'Error',
              message:'Please fill all the fields',
              type:'danger'
          })
        }
        else{
            const feedback={
                name:event.target.Name.value,
                email:event.target.Email.value,
                message:event.target.Message.value
            } 
            fetch('http://localhost:8000/FeedBack/sendFeedBack',{
                method:'POST',
                headers:{ 
                    'Content-Type': 'application/json',
                    Accept:'application/json',
                    Authorization:'Bearer '+JSON.parse(localStorage.getItem('jwt'))
                },
                body:JSON.stringify(feedback)
            }).then((res)=>{
                 res.json().then(function(data){
                     if(data.sent===true){
                    Notification({
                        title:'Successfull',
                        message:`${data.message}`,
                        type:'success'
                    })
                }else{
                    Notification({
                        title:'Failed',
                        message:`${data.message}`,
                        type:'danger'
                    }) 
                }
                 })
                 event.target.Name.value=''
                 event.target.Email.value=''
                 event.target.Message.value=''
            }).catch((err)=>{
                Notification({
                    title:'Error',
                    message:`Failed to Send Message`,
                    type:'danger'
                })
            })
        }
        

    }
    return (
        <div className='Contact'>
          
        <div className='baseContainerContact'>  
         <div className='ContactContent text-center'>
                 <h1 className='ContactContentHeading'>Get In Touch</h1>
                 <div className='ContactContentParagraph d-flex justify-content-center'>
                     <div className='ContactContentText'>
                        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. 
                     </div>
                </div>
         </div>
         <div className="row">
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12 px-5">
            <form onSubmit={handleMessageForm}>
            <input name='Name' type="text" className="form__input my-3" id="name" placeholder="Name" required="" />
            <input name='Email' type="email" className="form__input my-3" id="email" placeholder="Email" required="" />
            <textarea name='Message' className="form__input my-3" id="textArea" placeholder="write a message" required="">
            </textarea>
            <button type='submit' className='send-message'>Send Message</button>
            </form>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 mt-5 mt-md-0 mt-sm-5 mt-lg-0 mt-xl-0 px-5">
            <div className='rightContent'>
            <img className='rightContentImage my-3' src={chef} alt='chef'></img>
            <div className='rightContentAddress'>
             <p className='my-0'>Address:</p>
             <p className='my-0'>121 Car Street main road</p>
             <p className='my-0'>3000 Mangalore</p>
             <p className='breakAddress1 mt-5 mb-0'>Phone:</p>
             <p className='my-0'>90 987 65 44</p>
             <p className='breakAddress1 mt-5 mb-0'>Email:</p>
             <p className='my-0'>info@yoursite.com</p>
            </div>
            </div>
            </div>
        </div>
     </div>
     </div>
    )
}



