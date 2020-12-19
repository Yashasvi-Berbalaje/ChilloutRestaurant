import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../scss/aboutUs.scss';
import '../scss/base.scss';
import chef from '../../assets/chef.jpg';

export default function AboutUs() {
    return (
        <div className='about-us  ' >
             <div className="row baseContainerAboutUs ml-0 mr-0">
        <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12 d-flex ">
        <div className='leftContent'>
        <p className='leftContentStory'>
          Our Story
        </p>
        <h1 className='leftContentHeading'>Welcome</h1>
        <p className='leftContentParagraph'>
        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. 
        </p>
        <p className='leftContentParagraph'>
        A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
        </p>
        <button className='learn-more'>Learn More & About Us</button>
        </div>
        </div>
        <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12 my-sm-5 my-md-0 my-lg-0 my-xl-0 my-5 d-flex ">
        <div className='rightContent'>
        <img className='rightContentImage' src={chef} alt='chef'></img>
        </div>
        </div>
      </div> 

        </div>
    )
}
