import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../scss/footer.scss';
import '../scss/base.scss';

export default function footer() {
    return (
        <div className='footer'>
        <div className='baseContainerfooter'>
        <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <h5>About Us</h5>
               <p className='footer-about-us'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, similique, delectus blanditiis odit expedita amet. Sed labore ipsum vel dolore, quis, culpa et magni autem sequi facere eos tenetur, ex?</p>
            </div>
            <div className="footer-links col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 mt-5 mt-sm-5 mt-md-0 mt-lg-0 mt-xl-0 d-flex justify-content-center">
            <ul className='pl-0'>
            <h5>The Restaurant</h5>
                <li className='d-block float-none mb-3'><a href='/' className='float-none mb-3 footer-lists'>About Us</a></li>
                <li className='d-block float-none mb-3'><a href='/' className='float-none mb-3 footer-lists'>chefs</a></li>
                <li className='d-block float-none mb-3'><a href='/' className='float-none mb-3 footer-lists'>Events</a></li>
                <li className='d-block float-none mb-3'><a href='/' className='float-none mb-3 footer-lists'>Contact</a></li>
            </ul>
            </div>
            <div className="footer-links col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 mt-5 mt-sm-5 mt-md-0 mt-lg-0 mt-xl-0 d-flex justify-content-center">
            <ul className='footer-lists pl-0'>
            <h5>Useful Links</h5>
                <li className='d-block float-none mb-3'><a href='/' className='float-left mb-3 footer-lists'>Foods</a></li>
                <li className='d-block float-none mb-3'><a href='/' className='float-left mb-3 footer-lists'>Drinks</a></li>
                <li className='d-block float-none mb-3'><a href='/' className='float-left mb-3 footer-lists'>Breakfast</a></li>
                <li className='d-block float-none mb-3'><a href='/' className='float-left mb-3 footer-lists'>Brunch</a></li>
                <li className='d-block float-none mb-3'><a href='/' className='float-left mb-3 footer-lists'>Dinner</a></li>
            </ul>
            </div>
        </div>

        <div className='d-flex justify-content-center mt-5 mb-3' >
        <a className="facebookBtn smGlobalBtn mr-3" href="/" > </a>
        <a className="twitterBtn smGlobalBtn mr-3" href="/" > </a>
        <a className="InstagramBtn smGlobalBtn mr-3" href="/" > </a>
        </div>
        <div className='d-flex justify-content-center mt-5' >
        <p className='footer-about-us'>© Copyright ©2020 All rights reserved | This template is made with  by Yashasvi B</p>
        </div>
        
        </div>
        </div>
    )
}
