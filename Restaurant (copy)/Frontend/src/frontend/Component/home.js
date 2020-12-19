import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../scss/home.scss';
import '../scss/base.scss';
import { AiOutlineMenu} from "react-icons/ai";
import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap';
import RestaurantTable from '../../assets/restaurant.jpg';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import {Notification} from './Notification';
import moment from 'moment';

export default function Home() {
  const [ToggleMenu, setToggleMenu] = useState({
    display:false
  });
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [Time, setTime] = useState('10:00');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleReservation=(event)=>{
    event.preventDefault();
    if(!event.target.FirstName.value.trim()||!event.target.LastName.value.trim()||!event.target.Email.value.trim()||!event.target.NoOfPeople.value.trim()||!event.target.phone.value.trim()||!event.target.Date.value.trim()||!event.target.time.value.trim()||!event.target.message.value.trim()){
      Notification({
          title:'Error',
          message:'Please fill all the fields',
          type:'danger'
      })
    }else{
      const formattime=moment(event.target.time.value, "HH:mm:ss").format("hmm");
      const userid=JSON.parse(localStorage.getItem('user'));
      console.log(userid.id);
    const ReservationDetails={
      Firstname:event.target.FirstName.value,
      Lastname:event.target.LastName.value,
			email:event.target.Email.value,
      NoOfPeople:event.target.NoOfPeople.value,
      Phone:event.target.phone.value,
      Date:moment(event.target.Date.value).format('YYYYMMDD'),
      Time:`${formattime}00`,
      Message:event.target.message.value,
      ID:userid.id
    }

    fetch('http://localhost:8000/Service/Reservation',{
      method:'POST',
      headers:{
        'Content-type':'application/json',
        Accept:'application/json',
        Authorization:'Bearer '+JSON.parse(localStorage.getItem('jwt'))
      },
      body:JSON.stringify(ReservationDetails)
    }).then(response=>{
      response.json().then(data=>{
        if(data.reservation===true){
          Notification({
            title:'Success',
            message:`${data.message}`,
            type:'success'
          })
        }
        else{
          Notification({
            title:'Failed',
            message:`${data.message}`,
            type:'danger'
          }) 
        }
      })
    }).catch(err=>{
      console.log(err);
    })

  }
   }
   const handleLogout=()=>{
     fetch('http://localhost:8000/Auth/register',{
       method:'GET'
     }).then(response=>{
       response.json().then(data=>{
        Notification({
          title:'Success',
          message:`${data.message}`,
          type:'success'
        })
       })
       window.location='/login'
     }).catch(err=>{
      Notification({
        title:'failed',
        message:`failed to logout`,
        type:'danger'
      })
     })
   }

    return (
      <>
      {
        
      <div className="row mobile-header d-none mr-0 ml-0 py-0">
         <ReactNotification isMobile='true' breakpoint='700px'/> 
            <div className="col-6 ">
            <div className='logoContent float-left'>
                <h1 className='heading-logo'>CHILL OUT</h1>
            </div>
            </div>
            <div className="col-6">
            <div className='logoContent float-right'>
                <h1 className='heading-logo' style={{color:"#808080"}} onClick={()=>{
                  setToggleMenu({
                    display:!ToggleMenu.display
                  })
                }}><AiOutlineMenu style={{color:"#808080",marginRight:'3px'}}/>menu</h1>
            </div>
            </div>
            <div className={`col-12 ${ToggleMenu.display ===true?'d-block':'d-none'}`}>
              <ul className='mob-list-ul pl-0'>
                <li className='d-block float-none my-2 mob-list-li'><a href="#home">HOME</a></li>
                <li className='d-block float-nonemy-2 mob-list-li'><a href="#about">ABOUT</a></li>
                <li className='d-block float-none my-2 mob-list-li'><a href="#offer">OFFER</a></li>
                <li className='d-block float-none my-2 mob-list-li'><a href={"#"}>MENU</a></li>
                <li className='d-block float-none my-2 mob-list-li'><a href="#news">NEWS</a></li>
                <li className='d-block float-none my-2 mob-list-li'><a href="#gallery">GALLERY</a></li>
                <li onClick={()=>handleLogout()} className='d-block float-none my-2 mob-list-li'><a href="#contact">LOGOUT</a></li>
              </ul>
            </div>
      </div>
      }
        <div className='home'>
        <ReactNotification /> 
          <div className={`row headerBar baseContainer  ml-0 mr-0`}>
        <div className="col-4 d-flex ">
        <div className='logoContent'>
                <h1 className='heading-logo'>CHILL OUT</h1>
            </div>
        </div>
        <div className="col-8 d-flex justify-content-around">
          <div className='NavBar d-inline'>
          <ul className='web-list-ul'>
            <li className='web-list-li'><a href="/">HOME</a></li>
            <li className='web-list-li'><a href='/'>ABOUT</a></li>
            <li className='web-list-li'><a href="#offer">OFFER</a></li>
            <li className='web-list-li'><a href="#menu">MENU</a></li>
            <li className='web-list-li'><a href="#news">NEWS</a></li>
            <li className='web-list-li'><a href="#gallery">GALLERY</a></li>
            <li onClick={()=>handleLogout()} className='web-list-li'><a href="#contact">LOGOUT</a></li>
          </ul>
          </div>
        </div>
      </div> 

    
      <div className='HomeContentContainer'>
        <div className='HomeContent'>
        <h1 className='ContentHeading'>Welcome to Chill Out</h1>
        <p className='ContentTagline'>
          Come and Chill out with our Delicious and Healthy Food 
        </p>
        <button className="Reservation" onClick={handleShow}>Reservation</button>
        </div>
      </div>  
        </div>

        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header className='p-0'>
          <img alt='modalImage' src={RestaurantTable} className='w-100 ' style={{maxHeight:'350px',objectFit:'cover'}}></img>
        </Modal.Header>
        <Modal.Body className='p-4'>
           <div>
           <div className="row">
            <div className="col-12 mb-3">
            <Button variant="secondary" onClick={handleClose} style={{float:'right',display:'block'}} >
            Close
             </Button>
            </div>
            <div className="col-12">
            <h1 className='modalHeading'>Reserve A Table </h1>
            </div>
          </div>
          <form onSubmit={handleReservation}>
          <div className="row modalBody">
         
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <label className='mb-0 modalBodylabel'>First Name</label>
            <input type="text" className="form__input mt-1 mb-3" id="name" name='FirstName' required="" />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <label className='mb-0 modalBodylabel'>Last Name</label>
            <input type="text" className="form__input mt-1 mb-3" id="name" name='LastName'  required="" />
            </div>
            <div className="col-12">
            <label className='mb-0 modalBodylabel'>Email</label>
            <input type="text" className="form__input mt-1 mb-3" id="name" name='Email'  required="" />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <label className='mb-0 modalBodylabel'>How many people</label>
            <input type="number" min={1} className="form__input mt-1 mb-3" id="name" name='NoOfPeople' required="" />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <label className='mb-0 modalBodylabel'>Phone</label>
            <input type="number" className="form__input mt-1 mb-3" id="name" name='phone' required="" />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <label className='mb-0 modalBodylabel d-block'>Date</label>
            <DatePicker 
            selected={startDate} 
            onChange={date => setStartDate(date)} 
            name='Date' 
            className='form__input mt-1 mb-3' 
            minDate={new Date()}/>
            {/*<input type="text" className="form__input mt-1 mb-3" id="name"  required="" >
           
    </input>*/}
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <label className='mb-0 modalBodylabel'>Time</label>
            <TimePicker
              onChange={setTime}
              value={Time}
              className='form__input mt-1 mb-3'
              minDate={new Date()}
              name='time'
            />
            </div>
            <div className="col-12">
            <label className='mb-0 modalBodylabel'>Message</label>
            <textarea className="form__input my-3 col-12" id="textArea" name='message'  required="">

             </textarea>
            </div>
            <div className="col-12">
            <button type='submit' className='send-message w-100' >Send Message</button>
            </div>
          </div>
          </form>
           </div>
          </Modal.Body>
      </Modal>
        </>
    )
}
