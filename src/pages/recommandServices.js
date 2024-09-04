import React, { useState } from "react";
import ServiceCard from "../components/serviceCard";
import Slider from "react-slick";

const RecommandServices = () =>{
    
    const data =
    {
        'name' :'name',
        'variations_app_format' : {
            'default_price' : 900
        }
    };
    
    const recomandServiceSetting ={
        
        speed:1000,
        slidestoScroll:1,
        slidesToShow:4,
        autoplay:true,
};
    return (
        <div className="recomandDiv"> 
            <h4> Recomanded Services </h4>
            <Slider {...recomandServiceSetting}>
                <div>
                    <ServiceCard serviceDetails={data}/>
                </div>
                <div>
                <ServiceCard serviceDetails={data}/>
                </div>
                <div>
                <ServiceCard serviceDetails={data}/>
                </div>
            </Slider>
        </div>
    );
}
export default RecommandServices;