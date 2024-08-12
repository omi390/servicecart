import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ServiceCard from '../components/serviceCard';
import Slider from 'react-slick';
  
const TrendingServices = () => {
    const data = 
    {
        'name' :'name',
        'variations_app_format' : {
            'default_price' : 900
        }
    };


    const servicesSliderSettings = {
        dots: false,
        infinite: true,
        speed: 100,
        slidesToShow:4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
      };
    
    return (
      <div className='trendingServiceDiv'>
        <h4>Trending Services</h4>
        <Slider {...servicesSliderSettings}>
            <div>
                <ServiceCard serviceDetails={data} />
            </div>
            <div md={3}>
                <ServiceCard serviceDetails={data} />
            </div>
            <div md={3}>
                <ServiceCard serviceDetails={data} />
            </div>
            <div md={3}>
                <ServiceCard serviceDetails={data} />
            </div>
         </Slider>
       
      </div>
    );
  }
  
  export default TrendingServices;
