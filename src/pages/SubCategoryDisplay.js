import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Button, Collapse } from "react-bootstrap";
import cartempimg from "../images/cartimg.png";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const SubCategoryDisplay = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState({});
  const [variantQuantities, setVariantQuantities] = useState({}); // State to track quantities
  const variantsRef = useRef({});
  const imgBaseUrl = localStorage.getItem("imgBaseURL");
  const { id, name } = useParams();
  const [openItem, setOpenItem] = useState(null);

  const handleToggle = (id) => {
    setOpenItem(openItem === id ? null : id);
  };
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = { limit: 10, offset: 1 };
        const zoneId = localStorage.getItem("zoneId");
        const response = await axios.get(
          `${process.env.REACT_APP_ENDPOINT}/customer/service/sub-category/${id}`,
          {
            params: data,
            headers: { zoneId },
          }
        );
        if (response.data.content) {
          setServices(response.data.content.data);
          setSelectedService(response.data.content.data[0]);

          // Initialize variant quantities
          const initialQuantities = response.data.content.data.reduce(
            (acc, service) => {
              service.variations.forEach((variation) => {
                acc[variation.id] = 0;
              });
              return acc;
            },
            {}
          );
          setVariantQuantities(initialQuantities);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchServices();
  }, [id]);

  useEffect(() => {
    if (selectedService.id && variantsRef.current[selectedService.id]) {
      variantsRef.current[selectedService.id].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedService]);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const handleAddToCart = (variationId) => {
    setVariantQuantities((prevQuantities) => ({
      ...prevQuantities,
      [variationId]: (prevQuantities[variationId] || 0) + 1,
    }));
  };

  const handleQuantityChange = (variationId, change) => {
    setVariantQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[variationId] || 0) + change;
      return {
        ...prevQuantities,
        [variationId]: newQuantity > 0 ? newQuantity : 0,
      };
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row style={{ height: "100vh" }}>
        <Col md={4} style={{ padding: "30px" }}>
          <div className="servicesPageDisplayDiv">
            <h5 className="service-title-name">{name}</h5>
            <Row>
              {services.map((service) => (
                <Col
                  md={6}
                  key={service.id}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    backgroundColor:
                      selectedService.id === service.id ? "#f0f0f0" : "#fff",
                  }}
                  onClick={() => handleServiceClick(service)}
                >
                  <img
                    src={`${imgBaseUrl}/service/${service.cover_image}`}
                    className="services-image"
                    alt="Service"
                  />
                  <h5 className="service-name">{service.name}</h5>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
        <Col md={4} style={{ padding: "30px" }}>
          <div className="serviceVariantsDiv">
            {services.map((service) => (
              <div key={service.id}>
                <h5
                  ref={(e) => {
                    variantsRef.current[service.id] = e;
                  }}
                  style={{
                    padding: "10px",
                    backgroundColor:
                      selectedService.id === service.id ? "#f9f9f9" : "#fff",
                  }}
                >
                  {service.name}
                  <div
                    className="serviceDescription"
                    dangerouslySetInnerHTML={{
                      __html: service.short_description,
                    }}
                  />

                  <Collapse in={openItem === service.id}>
                    <div className="mt-2">
                      <div
                        className="serviceDescription"
                        dangerouslySetInnerHTML={{
                          __html: service.description,
                        }}
                      />
                    </div>
                  </Collapse>
                  <p
                    className="serviceDescription"
                    onClick={() => handleToggle(service.id)}
                  >
                    {openItem === service.id ? (
                      <>
                        Read Less <IoIosArrowUp />{" "}
                      </>
                    ) : (
                      <>
                        Read More
                        <IoIosArrowDown />
                      </>
                    )}
                  </p>
                </h5>
                {service.variations.map((variation) => (
                  <div
                    key={variation.id}
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #ddd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span className="variantNameTitle">
                        {variation.variant}
                      </span>
                      <span className="variantPrice">₹ {variation.price}</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }}>
                      {variantQuantities[variation.id] > 0 ? (
                        <>
                          <div className="cartCounter"
                            
                            onClick={() =>
                              handleQuantityChange(variation.id, -1)
                            }
                            disabled={variantQuantities[variation.id] <= 0}
                          >
                            -
                          </div>
                          <span style={{ margin: "0 10px" }}>
                            {variantQuantities[variation.id]}
                          </span>
                          <div  className="cartCounter"
                            
                            onClick={() =>
                              handleQuantityChange(variation.id, 1)
                            }
                          >
                            +
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            onClick={() => handleAddToCart(variation.id)}
                            style={{
                              width: "30px", // Width of the div
                              height: "30px", // Height of the div
                              borderRadius: "50%", // Makes the div round
                              backgroundColor: "#9000aa", // Background color
                              color: "white", // Text color
                              display: "flex", // Flexbox for centering
                              alignItems: "center", // Center items vertically
                              justifyContent: "center", // Center items horizontally
                              fontSize: "12px", // Font size for the "+"
                              border: "2px solid #5c056c", // Optional: Border color
                            }}
                          >
                            +
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Col>
        <Col md={4} style={{ padding: "30px" }}>
          <div className="cart-div">
            {/* <img src={cartempimg} className="cart-img" alt="Cart" />
            <h6 className="cartEmptyText">Cart Is Empty</h6> */}


          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SubCategoryDisplay;
