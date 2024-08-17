import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Button, Collapse } from "react-bootstrap";
import cartempimg from "../images/cartimg.png";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";

const SubCategoryDisplay = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState({});
  const [variantQuantities, setVariantQuantities] = useState({}); // State to track quantities
  const variantsRef = useRef({});
  const imgBaseUrl = localStorage.getItem("imgBaseURL");
  const { id, name } = useParams();
  const [openItem, setOpenItem] = useState(null);
  const [cartItems, setcartItems] = useState([]);
  const [cartLoader, setcartLoader] = useState(true);
  const [serviceLoader, setServiceLoader] = useState(true);

  const handleToggle = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  const fetchCartItems = async () => {
    const responseCartItems = await axios.get(
      `${process.env.REACT_APP_ENDPOINT}/customer/cart/list`,
      {
        params: {
          offset: 1,
          limit: 15,
        },
        headers: {
          zoneId: localStorage.getItem("zoneId"),
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (responseCartItems.data.response_code === "default_200") {
      responseCartItems.data.content.cart.data.forEach(variation => {
        setVariantQuantities((prevQuantities) => ({
          ...prevQuantities,
          [variation.variant_key]: variation.quantity,
        }));
      });
     
      setcartItems(responseCartItems.data.content.cart.data);
      setcartLoader(false);
    } else {
      setcartItems(false);
    }
  };
  useEffect(() => {
    //fetchCartItems
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
          setSelectedService(response.data.content.data[0]); //selected initially making it 0
          setServiceLoader(false);
          // Initialize variant quantities
          const initialQuantities = response.data.content.data.reduce(
            (acc, service) => {
              service.variations.forEach((variation) => {
                acc[variation.variant_key] = 0;
              });
              return acc;
            },
            {}
          );
          console.log(initialQuantities);
          setVariantQuantities(initialQuantities);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchServices();
    fetchCartItems();

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

  const handleAddToCart = async (
    variationId,
    serviceId,
    CategopryId,
    subCategoryId,
    VariantKey
  ) => {
    setVariantQuantities((prevQuantities) => ({
      ...prevQuantities,
      [variationId]: (prevQuantities[variationId] || 0) + 1,
    }));
    const data = {
      service_id: serviceId,
      category_id: CategopryId,
      sub_category_id: subCategoryId,
      variant_key: VariantKey,
      quantity: "1",
      guest_id: "",
    };
    setcartLoader(true);
    //api call
    const response = await axios.post(
      "https://myservicecart.com/co/api/v1/customer/cart/add",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          zoneId: localStorage.getItem("zoneId"),
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (response.data.response_code === "default_store_200") {
      toast.success("Added To Cart");
      fetchCartItems();
    }
    console.log(response);
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
            {serviceLoader ? (
              <>
                <Spinner style={{color:"#9000aa"}} animation="border" />
                </>
            ) : (
              <Row
                style={{
                  justifyContent: "center",
                }}
              >
                {services.map((service) => (
                  <Col
                    md={4}
                    key={service.id}
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "15px",
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
            )}
          </div>
        </Col>
        <Col md={4} style={{ padding: "30px" }}>
          <div className="serviceVariantsDiv">
            {serviceLoader ? (
              <>
                <Spinner style={{color:"#9000aa"}} animation="border" />
              </>
            ) : (
              <>
                {services.map((service) => (
                  <div key={service.id}>
                    <h5
                      ref={(e) => {
                        variantsRef.current[service.id] = e;
                      }}
                      style={{
                        padding: "10px",
                        backgroundColor:
                          selectedService.id === service.id
                            ? "#f9f9f9"
                            : "#fff",
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
                          <span className="variantPrice">
                            ₹ {variation.price}
                          </span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center" }}>
                          {variantQuantities[variation.variant_key] > 0 ? (
                            <>
                              <div
                                className="cartCounter"
                                onClick={() =>
                                  handleQuantityChange(
                                    variation.variant_key,
                                    -1
                                  )
                                }
                                disabled={
                                  variantQuantities[variation.variant_key] <= 0
                                }
                              >
                                -
                              </div>
                              <span style={{ margin: "0 10px" }}>
                                {variantQuantities[variation.variant_key]}
                              </span>
                              <div
                                className="cartCounter"
                                onClick={() =>
                                  handleQuantityChange(variation.variant_key, 1)
                                }
                              >
                                +
                              </div>
                            </>
                          ) : (
                            <>
                              <div
                                onClick={() =>
                                  handleAddToCart(
                                    variation.variant_key,
                                    service.id,
                                    service.category_id,
                                    service.sub_category_id,
                                    variation.variant_key
                                  )
                                }
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
              </>
            )}
          </div>
        </Col>
        <Col md={4} style={{ padding: "30px" }}>
          <div className="cart-div">
            {cartItems.length === 0 ? (
              <>
                <img src={cartempimg} className="cart-img" alt="Cart" />
                <h6 className="cartEmptyText">Cart Is Empty</h6>
              </>
            ) : (
              <div className="">
                <>
                  <h5> Cart </h5>

                  {cartLoader ? (
                    <>
                <Spinner style={{color:"#9000aa"}} animation="border" />
                </>
                  ) : (
                    <>
                      {cartItems.map((item) => (
                        <Row
                          key={item.id}
                          className="pt-2"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Col md={6}>
                            <p>
                              {" "}
                              <span
                                style={{ fontSize: "11px", fontWeight: "600" }}
                              >
                                {item.variant_key}{" "}
                              </span>
                              <br />
                              <span style={{ fontSize: "10px" }}>
                                {item.service.name}
                                {""}
                              </span>
                              <br></br>
                              <span style={{ fontSize: "11px" }}>
                                {" "}
                                ₹ {item.total_cost}{" "}
                              </span>
                            </p>
                          </Col>
                          <Col
                            md={6}
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              alignItems: "center",
                            }}
                          >
                            <div
                              className="cartDiv "
                              style={{
                                display: "flex",
                                height: "32px",
                                alignItems: "center",
                              }}
                            >
                              <div
                                className="cartCounter"
                                onClick={() =>
                                  handleQuantityChange(item.variant_key, -1)
                                }
                                disabled={
                                  variantQuantities[item.variant_key] <= 0
                                }
                              >
                                -
                              </div>
                              <span
                                style={{ margin: "0 10px", fontSize: "12px" }}
                              >
                                {item.quantity}
                              </span>

                              <div
                                className="cartCounter"
                                onClick={() =>
                                  handleQuantityChange(item.variant_key, 1)
                                }
                              >
                                +
                              </div>
                            </div>
                          </Col>
                          {/* <Col>
                            
                          </Col> */}
                        </Row>
                      ))}
                      <div className="pt-4 d-grid gap-2 ">
                        <Button className="cart-btn" size="sm">
                          view cart
                        </Button>
                      </div>
                    </>
                  )}
                </>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SubCategoryDisplay;
