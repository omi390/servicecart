// File: src/components/CategoryList.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Row,Col } from 'react-bootstrap';
import Slider from "react-slick";
import { Link } from "react-router-dom";

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F5FF33', '#FF33A6'];

const CategoryDetail = () => {
    const {id,name} = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imgBaseUrl = localStorage.getItem("imgBaseURL");

  const categorySliderSettings = {
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 3,
    autoplay: true,
  };
  useEffect(() => {
    console.log(id);
    const fetchCategories = async () => {
      try {
        const data ={
          'limit':10,
          'offset':1,
          'id':id
        }
        const zoneId = localStorage.getItem("zoneId");

        const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}/customer/category/childes`,
          {
            params:data,
            headers:{
              zoneId:zoneId
            }
          }
        );
       
        setCategories(response.data.content.data);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div className='container'>
      <h1>{name}</h1>
  
      <div className="category-slider">
          {/* <Slider {...categorySliderSettings}> */}
          <Row>
              
            {categories.map((category, index) => (
              <Col>
              <div key={category.id}>
                <img src={`${imgBaseUrl}/category/${category.image}`} alt="i mg" />
                <h5  className="category-slider-font-title pt-4">
                  <Link to={`/subcategory/services/${category.id}/${category.name}`}>{category.name}</Link>
                </h5>
              </div>
              </Col>
            ))}
            
            </Row>
          {/* </Slider> */}
        </div>
      <div>
   
      </div>
    </div>/* main div */
  );
};

export default CategoryDetail;
