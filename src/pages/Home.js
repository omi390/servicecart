// File: src/components/CategoryList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import TrendingServices from "../pages/trendingServices";
import RecommandServices from "./recommandServices";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imgBaseUrl = localStorage.getItem("imgBaseURL");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = {
          limit: 10,
          offset: 1,
        };

        const zoneId = localStorage.getItem("zoneId");
        const response = await axios.get(
          `${process.env.REACT_APP_ENDPOINT}/customer/category`,
          {
            params: data,
            headers: {
              zoneId: zoneId,
            },
          }
        );
        console.log(response);
        setCategories(response.data.content.data);

        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div> loading..</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  const bannerSliderSettings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  const categorySliderSettings = {
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 3,
    autoplay: true,
  };

  return (
    <div>
      <div className="banner-slider">
        <Slider {...bannerSliderSettings}>
          <div>
            <img
              className="imgBanner"
              src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_600,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1698216827166-bc6957.jpeg"
              alt="Banner 1"
            />
          </div>
          <div>
            <img src="image2.jpg" alt="Banner 2" />
          </div>
          <div>
            <img src="image3.jpg" alt="Banner 3" />
          </div>
          {/* Add more slides as needed */}
        </Slider>
      </div>

      <div className="slider">
        <h4>Trending Categories {process.env.REACT_APP_API_URL}</h4>
        <div className="category-slider">
          <Slider {...categorySliderSettings}>
            {categories.map((category, index) => (
              <div key={category.id}>
                <img
                  src={`${imgBaseUrl}/category/${category.image}`}
                  alt="i mg"
                />
                <h5 className="category-slider-font-title pt-4">
                  <Link to={`/category/${category.id}/${category.name}`}>
                    {category.name}
                  </Link>
                </h5>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="trendingServicesDiv container">
        {/* <TrendingServices /> */}
      </div>
      <div className="container">
        {/* <RecommandServices /> */}
      </div>
    </div>
  );
};

export default Home;
