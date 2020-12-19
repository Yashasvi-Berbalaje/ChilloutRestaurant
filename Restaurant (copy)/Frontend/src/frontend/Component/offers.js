import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../scss/offers.scss';
import '../scss/base.scss';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import barfi from '../../assets/barfi.jpg';
import GulabJamun from '../../assets/gulab-jamun.jpg';
import Jalfrezi from '../../assets/jalfrezi.jpg';
import Kheer from '../../assets/kheer.jpg';
import Khulfi from '../../assets/kulfi.jpg';
import Pakora from '../../assets/pakora.jpg';
import PaniPuri from '../../assets/pani-puri.jpg';
import PavBhaji from '../../assets/pavBhaji.jpg';
import Roti from '../../assets/roti.jpg';
import Shrikhand from '../../assets/shrikhand.jpg';
import Vada from '../../assets/vada.jpg';
import RasMalai from '../../assets/rasmalai.jpg';
import order from '../../assets/order.jpg';
import Modal from 'react-bootstrap/Modal';
import {Button} from 'react-bootstrap';
import RestaurantTable from '../../assets/restaurant.jpg';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import {Notification} from './Notification';
import moment from 'moment';


export default function Offers() {
    const [show, setShow] = useState(false);
    const [price, setPrice] = useState({
        actualprice:0,
        updatedPrice:0
    } );
    const [title,setTitle]=useState()
    const [quantity, setQuantity] = useState(
        1   
        );
    const handleShow = (food) => {
        setTitle(food.foodTitle);
       setQuantity(1)
        setPrice({
            actualprice:food.price,
            updatedPrice:food.price
        });
        setShow(true);
    };
    const [startDate, setStartDate] = useState(new Date());
  const [Time, setTime] = useState('10:00');
  const handleClose = () => setShow(false);

  const handleOrder=(event)=>{
    event.preventDefault();
    if(!event.target.FirstName.value.trim()||!event.target.LastName.value.trim()||!event.target.Email.value.trim()||!event.target.phone.value.trim()||!event.target.address.value.trim()){
      Notification({
          title:'Error',
          message:'Please fill all the fields',
          type:'danger'
      })
    }
    else{
        const userid=JSON.parse(localStorage.getItem('user'));
        const orderDetails={
            Firstname:event.target.FirstName.value,
            Lastname:event.target.LastName.value,
            email:event.target.Email.value,
            phone:event.target.phone.value,
            Item:title,
            Quantity:event.target.quantity.value,
            Address:event.target.address.value,
            ID:userid.id,
            price:price.updatedPrice
        }

        fetch('http://localhost:8000/Service/Order',{
      method:'POST',
      headers:{
        'Content-type':'application/json',
        Accept:'application/json',
        Authorization:'Bearer '+JSON.parse(localStorage.getItem('jwt'))
      },
      body:JSON.stringify(orderDetails)
    }).then(response=>{
      response.json().then(data=>{
        if(data.order===true){
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


    const options = {
        loop:false,
        margin:10,
        responsiveClass:true,
        center:false,
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 1,
            },
            600: {
                items: 2,
            },
            700: {
                items: 2,
            },
            900: {
                items: 2,
    
            },
            1000: {
                items: 3,
    
            }
        },
    };
    const carditems=[
        {
            image:barfi,
            price:10.50,
            foodTitle:'Barfi',
            foodDescription:'Even though its name originates from Persia, barfi is an original Indian dessert which resembles a fudge.'
        },
        {
            image:Khulfi,
            price:5.50,
            foodTitle:'Khulfi',
            foodDescription:'Kulfi is a traditional Indian ice cream made with slowly simmered whole milk. Although the long-simmering process results in a loss of volume, it makes up for it with a delicious, nutty, caramelized flavor.'
        },
        {
            image:GulabJamun,
            price:20.50,
            foodTitle:'Gulab Jamun',
            foodDescription:'Gulab jamun is a dessert based on milk solids that are kneaded into a dough, shaped into balls, and deep-fried in ghee.'
        },
        {
            image:Jalfrezi,
            price:13.50,
            foodTitle:'Jalfrezi',
            foodDescription:'Jalfrezi is an Indian technique for preparing a type of curry made by frying marinated pieces of meat, paneer, or vegetables in various spices (turmeric, coriander, cumin) and oil in order to produce a thick gravy.'
        },
        {
            image:PaniPuri,
            price:2.50,
            foodTitle:'Pani Puri',
            foodDescription:'In North India, panipuri is known as golgappa, gol referring to the crispy shell, and gappa referring to the eating process, since these small snacks are typically eaten one at a time.'
        },
        {
            image:Pakora,
            price:34.50,
            foodTitle:'Pakora',
            foodDescription:'Pakora is a savory, deep-fried Indian snack made with pieces of vegetables such as cauliflower and eggplant.'
        },
        {
            image:Kheer,
            price:17.50,
            foodTitle:'Kheer',
            foodDescription:'Kheer or payasam is an ancient Indian dessert, a creamy rice pudding that is made in several versions across the country.'
        },
        {
            image:Shrikhand,
            price:23.50,
            foodTitle:'Shrikhand',
            foodDescription:'Shrikhand is a popular Indian yogurt-based dessert, combined with sugar and fruits in order to develop a rich, creamy texture and sweet flavor. '
        },
        {
            image:PavBhaji,
            price:5.50,
            foodTitle:'Pav Bhaji',
            foodDescription:'Pav bhaji is a popular street snack originating from the Indian state of Maharashtra. It consists of a vegetable curry that is typically served with a soft bread roll known as pav.'
        },
        {
            image:Roti,
            price:60.50,
            foodTitle:'Roti',
            foodDescription:'Roti is a flat and unleavened bread made with wholemeal flour. It is traditionally cooked on an iron griddle called tava, an important vessel in the Indian cuisine. '
        },
        {
            image:Vada,
            price:35.50,
            foodTitle:'Vada',
            foodDescription:`Vada pav is one of ${"Mumbai's"}  favorite sandwiches, its name referring to the key ingredients: vada, or spicy mashed potatoes that are deep-fried in chickpea batter, and pav, or white bread rolls.`
        },
        {
            image:RasMalai,
            price:40.50,
            foodTitle:'Ras Malai',
            foodDescription:'Ras malai is a popular Indian dessert consisting of white cream, sugar, milk, and cardamom-flavored paneer cheese known as chhana. '
        },

];

    return (
        <div className='offers'>
           <div className='baseContainerOffers'>
            
            
            <div className='offersContent text-center'>
                   <p className='offerContentStory'>
                    Our Offers
                    </p>
                    <h1 className='offerContentHeading'>Our Offers This Summer</h1>
                    <div className='offerContentParagraph d-flex justify-content-center'>
                        <div className='offerContentText'>
                           Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. 
                        </div>
                   </div>
            </div>
            
            <div className='carousel-Conatiner'>
            <OwlCarousel
                    className="owl-theme"
                    
                   {...options}
                >
                {
                            carditems.map((item)=>( 
                            <div className="item text-align-center ">
                            <div className="card w-100 rounded-0 border-0">
                            <img className="card-img-top" src={item.image} alt="Card cap"></img>
                            <div className="card-body card-content py-5 ">
                                <p className="card-text foodPrice">{item.price} Rs</p>
                                <h3  className="foodTitle">{item.foodTitle}</h3>
                                <div className="scrollbar " id="style-1">
                                <div className="force-overflow d-flex justify-content-center">
                                <p className="card-text foodDescription mr-3">{item.foodDescription}</p>
                                </div>
                                </div>
                               
                                <button onClick={()=>handleShow(item)} className='order-now'>Order Now!</button>
                            </div>
                            
                            </div>
                            </div>))
                    }      
             </OwlCarousel>
            </div>
            <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header className='p-0'>
          <img alt='modalImage' src={order} className='w-100 ' style={{maxHeight:'350px',objectFit:'cover'}}></img>
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
            <h1 className='modalHeading'>Order {title} ! </h1>
            </div>
          </div>
          <form onSubmit={handleOrder} >
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
            <div className="col-12">
            <label className='mb-0 modalBodylabel'>Phone</label>
            <input type="number" className="form__input mt-1 mb-3" id="name" name='phone' required="" />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <label className='mb-0 modalBodylabel d-block'>Quantity</label>
            <input type="number" className="form__input mt-1 mb-3" min='1' id="name" onChange={event => {
                setQuantity(event.target.value);
                setPrice({
                    actualprice:price.actualprice,
                    updatedPrice:event.target.value*price.actualprice
                })
            }} 
                name='quantity' value={quantity} required="" />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <label className='mb-0 modalBodylabel'>Price</label>
            <p className='price' style={{marginTop:'5px',fontSize:'2em'}}>{price.updatedPrice}Rs</p>
            </div>
            <div className="col-12">
            <label className='mb-0 modalBodylabel'>Address</label>
            <textarea className="form__input my-3 col-12" id="textArea" name='address'  required="">

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

           </div>
        </div>
    )
}
