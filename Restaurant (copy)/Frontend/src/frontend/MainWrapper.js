import React from 'react';
import Home from './Component/home';
import AboutUs from './Component/AboutUs';
import Offers from './Component/offers';
import Menu from './Component/menu';
import News from './Component/news';
import Gallery from './Component/gallery'; 
import GetInTouch from './Component/getInTouch'; 
import Footer from './Component/footer';

function ComponentWrapper() {
  return (
    
    <div className="ComponentWrapper">

      <Home></Home>
      <AboutUs></AboutUs>
      <Offers></Offers>
      <Menu></Menu>
      <News></News>
      <Gallery></Gallery>
      <GetInTouch></GetInTouch>
      <Footer></Footer>
    </div>
  );
}

export default ComponentWrapper;
