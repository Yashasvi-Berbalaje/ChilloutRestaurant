import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../scss/news.scss';
import '../scss/base.scss';
import barfi from '../../assets/barfi.jpg';
import GulabJamun from '../../assets/gulab-jamun.jpg';
import Khulfi from '../../assets/kulfi.jpg';
export default function news() {
    const carditems=[
        {
            image:barfi,
            price:'$10.50',
            foodTitle:'Barfi',
            foodDescription:'Even though its name originates from Persia, barfi is an original Indian dessert which resembles a fudge.'
        },
        {
            image:Khulfi,
            price:'$5.50',
            foodTitle:'Khulfi',
            foodDescription:'Kulfi is a traditional Indian ice cream made with slowly simmered whole milk. Although the long-simmering process results in a loss of volume, it makes up for it with a delicious, nutty, caramelized flavor.'
        },
        {
            image:GulabJamun,
            price:'$20.50',
            foodTitle:'Gulab Jamun',
            foodDescription:'Gulab jamun is a dessert based on milk solids that are kneaded into a dough, shaped into balls, and deep-fried in ghee.'
        }
];

    return (
        <div className='news'>
           <div className='baseContainerNews'>
            
            
            <div className='newsContent text-center'>
                    <h1 className='newsContentHeading'>News</h1>
                    <div className='newsContentParagraph d-flex justify-content-center'>
                        <div className='newsContentText'>
                           Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. 
                        </div>
                   </div>
            </div>
            <div class="row">          
                {
                            carditems.map((item)=>( 
                                <div class="col-sm-12 col-sx-12 col-md-12 col-lg-4 mb-5 mb-sm-5 mb-md-0 mb-lg-0 mb-xl-0 ">
                            <div className="item text-align-center ">
                            <div className="card w-100 rounded-0 border-0">
                            <img className="card-img-top" src={item.image} alt="Card cap"></img>
                            <div className="card-body card-content py-5 ">
                                <p className="card-text foodPrice">{item.price}</p>
                                <h3  className="foodTitle">{item.foodTitle}</h3>
                                <div className="scrollbar " id="style-1">
                                <div className="force-overflow">
                                <p className="card-text foodDescription mr-3">{item.foodDescription}</p>
                                </div>
                                </div>
                               
                                <button className='Read-more'>Read More</button>
                            </div>
                            </div>
                            </div>
                            </div>))
                    }      
                </div>
            
        </div>
        </div>
    )
}
