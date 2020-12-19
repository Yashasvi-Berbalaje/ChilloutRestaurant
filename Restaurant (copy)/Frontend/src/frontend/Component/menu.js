import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../scss/menu.scss';
import '../scss/base.scss';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import barfi from '../../assets/barfi.jpg';
import GulabJamun from '../../assets/gulab-jamun.jpg';
import Jalfrezi from '../../assets/jalfrezi.jpg';
import Kheer from '../../assets/kheer.jpg';
import Khulfi from '../../assets/kulfi.jpg';
import Pakora from '../../assets/pakora.jpg';
import PaniPuri from '../../assets/pani-puri.jpg';
import PavBhaji from '../../assets/pavBhaji.jpg';
import Shrikhand from '../../assets/shrikhand.jpg';


export default function menu() {

    const carditems=[
        {
            image:barfi,
            menuCardPrice:'$10.50',
            menuCardTitle:'Barfi',
            menuCardDescription:'Even though its name originates from Persia, barfi is an original Indian dessert which resembles a fudge.'
        },
        {
            image:Khulfi,
            menuCardPrice:'$5.50',
            menuCardTitle:'Khulfi',
            menuCardDescription:'Kulfi is a traditional Indian ice cream made with slowly simmered whole milk. Although the long-simmering process results in a loss of volume, it makes up for it with a delicious, nutty, caramelized flavor.'
        },
        {
            image:GulabJamun,
            menuCardPrice:'$20.50',
            menuCardTitle:'Gulab Jamun',
            menuCardDescription:'Gulab jamun is a dessert based on milk solids that are kneaded into a dough, shaped into balls, and deep-fried in ghee.'
        },
        {
            image:Jalfrezi,
            menuCardPrice:'$13.50',
            menuCardTitle:'Jalfrezi',
            menuCardDescription:'Jalfrezi is an Indian technique for preparing a type of curry made by frying marinated pieces of meat, paneer, or vegetables in various spices (turmeric, coriander, cumin) and oil in order to produce a thick gravy.'
        },
        {
            image:PaniPuri,
            menuCardPrice:'$2.50',
            menuCardTitle:'Pani Puri',
            menuCardDescription:'In North India, panipuri is known as golgappa, gol referring to the crispy shell, and gappa referring to the eating process, since these small snacks are typically eaten one at a time.'
        },
        {
            image:Pakora,
            menuCardPrice:'$34.50',
            menuCardTitle:'Pakora',
            menuCardDescription:'Pakora is a savory, deep-fried Indian snack made with pieces of vegetables such as cauliflower and eggplant.'
        },
        {
            image:Kheer,
            menuCardPrice:'$17.50',
            menuCardTitle:'Kheer',
            menuCardDescription:'Kheer or payasam is an ancient Indian dessert, a creamy rice pudding that is made in several versions across the country.'
        },
        {
            image:Shrikhand,
            menuCardPrice:'$23.50',
            menuCardTitle:'Shrikhand',
            menuCardDescription:'Shrikhand is a popular Indian yogurt-based dessert, combined with sugar and fruits in order to develop a rich, creamy texture and sweet flavor. '
        },
        {
            image:PavBhaji,
            menuCardPrice:'$5.50',
            menuCardTitle:'Pav Bhaji',
            menuCardDescription:'Pav bhaji is a popular street snack originating from the Indian state of Maharashtra. It consists of a vegetable curry that is typically served with a soft bread roll known as pav.'
        }
];




    return (
        <div className='menu'>
        <div className='baseContainerMenu'>     
         <div className='menuContent text-center'>
                 <h1 className='menuContentHeading'>Delicious Menu</h1>
                 <div className='menuContentParagraph d-flex justify-content-center'>
                     <div className='menuContentText'>
                        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. 
                     </div>
                </div>
         </div>
         <div>
         <Tabs defaultActiveKey="Breakfast" id="uncontrolled-tab-example">
            <Tab eventKey="Breakfast" title="Breakfast">
              <div class="row">
              {
                            carditems.map((item)=>(                                        
                                <div className="col-md-12 col-sm-12 col-xs-12 col-lg-6 menu-card">
                                <div className="card mb-3 border-0 ">
                                <div className="row no-gutters">
                                    <div className="col-3  menu-card-img-container">
                                    <img src={item.image} class="card-img menu-card-img float-right mt-4" alt="barfi"></img>
                                    </div>
                                    <div className="col-9">
                                    <div className="card-body">
                                        <h5 className="card-title menu-card-Title">{item.menuCardTitle}</h5>
                                        <div className="scrollbar " id="style-1">
                                                    <div className="force-overflow mr-2">
                                                    <p className="card-text card-text-description">{item.menuCardDescription}</p>
                                                    </div>
                                                    </div>
                                        <p className="card-text "><small class="menu-card-Price ">{item.menuCardPrice}</small></p>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                </div>

                           ))
                    }  
              </div> 
            </Tab>
            <Tab eventKey="Lunch" title="Lunch">
            <div class="row">
              {
                            carditems.map((item)=>(                                        
                                <div className="col-md-12 col-sm-12 col-xs-12 col-lg-6 menu-card">
                                <div className="card mb-3 border-0 ">
                                <div className="row no-gutters">
                                    <div className="col-3  menu-card-img-container">
                                    <img src={item.image} class="card-img menu-card-img float-right mt-4" alt="barfi"></img>
                                    </div>
                                    <div className="col-9">
                                    <div className="card-body">
                                        <h5 className="card-title menu-card-Title">{item.menuCardTitle}</h5>
                                        <div className="scrollbar " id="style-1">
                                                    <div className="force-overflow mr-2">
                                                    <p className="card-text card-text-description">{item.menuCardDescription}</p>
                                                    </div>
                                                    </div>
                                        <p className="card-text "><small class="menu-card-Price ">{item.menuCardPrice}</small></p>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                </div>

                           ))
                    }  
              </div> 
            
            </Tab>
            <Tab eventKey="Dinner" title="Dinner">
            <div class="row">
              {
                            carditems.map((item)=>(                                        
                                <div className="col-md-12 col-sm-12 col-xs-12 col-lg-6 menu-card">
                                <div className="card mb-3 border-0 ">
                                <div className="row no-gutters">
                                    <div className="col-3  menu-card-img-container">
                                    <img src={item.image} class="card-img menu-card-img float-right mt-4" alt="barfi"></img>
                                    </div>
                                    <div className="col-9">
                                    <div className="card-body">
                                        <h5 className="card-title menu-card-Title">{item.menuCardTitle}</h5>
                                        <div className="scrollbar " id="style-1">
                                                    <div className="force-overflow mr-2">
                                                    <p className="card-text card-text-description">{item.menuCardDescription}</p>
                                                    </div>
                                                    </div>
                                        <p className="card-text "><small class="menu-card-Price ">{item.menuCardPrice}</small></p>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                </div>

                           ))
                    }  
              </div> 
             
            </Tab>
            </Tabs>
         </div>

        </div>
     </div>
    )
}
