import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import SlotPicker from "./SlotPicker";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FiPlus } from "react-icons/fi";
import { GrEdit } from "react-icons/gr";
import Map from "./Map";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export const CheckOutPage = () => {
  const [cartItems, setcartItems] = useState([]);
  const [cartLoader, setcartLoader] = useState(true);
  const [show, setShow] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();

  const [addressFormData, setAddressFormData] = useState({
    houseName: "",
    addressName: "",
    contactPerson: "",
    floorName: "",
    isAdd: "1",
    id: "",
  });
  const [pinLocation, setPinLocation] = useState({
    lat: "",
    lng: "",
  });

  const [pinLatLng, setPinLatLng] = useState({
    lat: "",
    lng: "",
  });
  const [totalCost, setTotalCost] = useState(0);
  // const [loading, setLoading] = useState(false);

  const [validationError, setValidationError] = useState(""); // Validation state

  const phone = localStorage.getItem("mobile");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editAddressShow, setEditAddressShow] = useState(false);

  const handleEditClose = () => setEditAddressShow(false);
  const handleEditShow = ({ isAdd, editAdd }) => {
    console.log(editAdd);
    console.log("edit");
    if (isAdd === 1) {
      const lat = localStorage.getItem("lat") || "";
      const lng = localStorage.getItem("lng") || "";
      setPinLocation({ lat, lng });
      setAddressFormData({
        houseName: "",
        addressName: "",
        contactPerson: "",
        floorName: "",
        isAdd: "1",
        id: "",
      });
    } else {
      const lat = editAdd.lat;
      const lng = editAdd.lon;
      setPinLocation({ lat, lng });

      setAddressFormData({
        houseName: editAdd.house,
        addressName: editAdd.address,
        contactPerson: editAdd.contact_person_name,
        floorName: "",
        isAdd: "0",
        id: editAdd.id,
      });
    }
    console.log(pinLocation);
    console.log("valuess");
    setEditAddressShow(true);
  };

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error("Failed to load Razorpay script"));
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript()
      .then(() => console.log("Razorpay script loaded"))
      .catch((error) => console.error(error));

    const fetchCartItems = async () => {
      try {
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
          console.log(
            "Cart items fetched:",
            responseCartItems.data.content.cart.data
          );

          setcartItems(responseCartItems.data.content.cart.data);
          setTotalCost(responseCartItems.data.content.total_cost);
          setcartLoader(false);
        } else {
          setcartItems([]);
          setcartLoader(false);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setcartLoader(false);
      }
    };

    fetchCartItems();
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    try {
      const responseAddress = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/customer/address`,
        {
          params: {
            limit: "10",
            offset: "1",
          },
          headers: {
            zoneId: localStorage.getItem("zoneId"),
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (responseAddress.data.response_code === "default_200") {
        console.log("address is fetched");
      }
      setAddresses(responseAddress.data.content.data);
    } catch (error) {
      console.log(error);
    }
  };
  const editAddressFun = async () => {
    // setLoading(true);

    const data = {
      house: addressFormData.houseName,
      floor: addressFormData.floorName,
      address: addressFormData.addressName,
      contact_person_name: addressFormData.contactPerson,
      lat: pinLatLng.lat,
      lon: pinLatLng.lng,
      city: localStorage.getItem("zoneName"),
      street: "",
      contact_person_number: localStorage.getItem("mobile"),
      zip_code: "",
      country: "",
      address_type: "service",
      address_label: "Address 01",
      guest_id: null,
    };
    try{
    if (addressFormData.isAdd === 1) {
      const response = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}/customer/address`,
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
        handleEditClose();
        fetchAddress();
      }
    } else {
      //update code here
      const response = await axios.put(
        `${process.env.REACT_APP_ENDPOINT}/customer/address/${addressFormData.id}`,
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
        handleEditClose();
        fetchAddress();
      }
    }
  }
  catch(error){
    console.error("Error editing address:", error);

  }
  // finally{
  //   setLoading(false);

  // }
  };
  const saveAddressForm = (e) => {
    const { name, value } = e.target;
    setAddressFormData((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };
  //validation starts 
  const validateAndProceed = () => {
    if (!selectedAddress) {
      const confirmed = window.confirm("Please select an address.");
      setValidationError(confirmed);
      return false;
    }
    if (!selectedSlot) {
    //  const confirmed = window.confirm("Please select a slot.");
      // setValidationError(confirmed);
      toast.error("Please select a slot."); 
      // setValidationError;
      return false;
    }
    setValidationError("");
    return true;
  };


  //validation ends 


  // payment code starts

  const handlePayment = () => {
    if (!window.Razorpay) {
      console.error("Razorpay script not loaded");
      return;
    }

    if (!validateAndProceed()) {
      return;
    }

    const options = {
      key: "rzp_test_u2uMrwB1S9wyiY",
      amount: Math.round(totalCost * 100),
      currency: "INR",
      name: "ServiceCart",
      description: "Test Transaction",
      image: "https://your-logo-url.com",
      handler: function (response) {
        console.log("Payment Success", response);
        createOrder({ paymentType: 'cash_after_service' })    
        // alert(`Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "Your Name",
        email: "your.email@example.com",
        contact: phone,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#9000aa",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      console.log("Payment Failed", response.error);
      alert(`Payment Failed: ${response.error.description}`);
    });

    rzp.open();
  };

  // payment code ends

  // order create
  const createOrder = async({paymentType}) => {
    if(!validateAndProceed()) {
      return;
       }

    // setLoading(true);

    const data ={
      service_schedule:selectedSlot,
      service_address_id:selectedAddress,
      post_id:"",
      provider_id:"",
      offline_payment_id:"",
      customer_information:"",
      payment_method:paymentType,
      zone_id: localStorage.getItem("zoneId"),
      guest_id:null

    };
    try{
      const response = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}/customer/booking/request/send`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            zoneId: localStorage.getItem("zoneId"),
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);

      if(response.data.response_code === 'booking_place_success_200'){
        //booking page
        navigate('/bookings'); 

      }else{
        toast.error("Booking failed. Please try again !")
      }
      console.log(response.data);
    }
    catch(error){
      console.log(error);
    }
  };
  // order create ends

  return (
    <div className="container">
      {/* start  */}
      <Row>
        <Col md={4}>
          {/* starts col  */}
          <h1 className="checkoutPageTotalTitle">₹{totalCost}</h1>

          {/* items start  */}
          {cartItems.map((item) => (
            <Row key={item.id} className="pt-2">
              <Col md={8} style={{ textAlign: "left" }}>
                <p>
                  {" "}
                  <span style={{ fontSize: "12px", fontWeight: "700" }}>
                    {item.variant_key}{" "}
                  </span>
                  <br />
                  <span style={{ fontSize: "11px" }}>
                    {item.service.name}
                    {""}
                  </span>
                  <br></br>
                  <span style={{ fontSize: "11px" }}>
                    {item.total_cost} * {item.quantity}
                  </span>
                </p>
              </Col>

              <Col
                md={4}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginTop: "11px",
                }}
              >
                <p style={{ fontSize: "12px" }}>
                  ₹ {item.total_cost * item.quantity}
                </p>
              </Col>
            </Row>
          ))}

          {/* items ends  */}

          <hr></hr>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4 className="subtotalCheckout">SubTotal</h4>
            <h4 className="subtotalAmtCheckout">1999</h4>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4 className="subtotalCheckout">Tax(5%)</h4>
            <h4 className="subtotalAmtCheckout">199</h4>
          </div>
          <hr></hr>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4 className="subtotalCheckout">
              <b> Total</b>
            </h4>
            <h4 className="subtotalAmtCheckout">
              <b>{totalCost}</b>
            </h4>
          </div>
          {/* ends col  */}
        </Col>
        <Col md={8} style={{ padding: "50px" }}>
          <div className="check">
            {/* slot start */}
            <div style={{ marginTop: "10px", padding: "5px", display: "flex" }}>
              <h5 className="checkOutTitle">send details to {phone} </h5>
            </div>
            <hr></hr>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "flex-end",
              }}
            >
              <h5 className="checkOutTitle"> Address</h5>
              <Button
                className="editButton"
                onClick={() => handleEditShow({ isAdd: 1 })}
                style={{ width: "8%" }}
              >
                {" "}
                Add
              </Button>

              {/* address modal starts */}

              {/* address modal ends */}
              {/* edit address modal begins */}
              <Modal
                onShow={handleClose}
                show={editAddressShow}
                onHide={handleEditClose}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Change address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div style={{ display: "flex" }}>
                    <div>
                      <Map
                        lat={pinLocation.lat}
                        lng={pinLocation.lng}
                        setPinLatLng={setPinLatLng}
                      />
                    </div>
                    <div
                      style={{
                        width: "100%",
                        padding: "20px",
                        alignContent: "center",
                        alignItems: "crnter",
                        textAlign: "center",
                        alignSelf: "center",
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Form.Control
                        type="text"
                        name="contactPerson"
                        value={addressFormData.contactPerson}
                        onChange={saveAddressForm}
                        placeholder="Name"
                      />
                      <br />
                      <Form.Control
                        type="text"
                        name="houseName"
                        value={addressFormData.houseName}
                        onChange={saveAddressForm}
                        placeholder="House/Flat No"
                      />
                      <br />
                      <Form.Control
                        type="text"
                        name="addressName"
                        value={addressFormData.addressName}
                        onChange={saveAddressForm}
                        placeholder="Address"
                      />
                      <br />
                      <Button variant="primary" onClick={editAddressFun}>
                        Save
                      </Button>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>

              {/* edit address modal ends */}
            </div>
            <div>
              <div className="address-selector">
                <h2>Select an Address</h2>
                {addresses.map((address) => (
                  <div style={{ display: "flex", width: "100%" }}>
                    <label
                      key={address.id}
                      style={{ width: "100%" }}
                      className={`address-item ${
                        selectedAddress === address.id ? "selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        value={address.id}
                        checked={selectedAddress === address.id}
                        onChange={() => setSelectedAddress(address.id)}
                      />
                      {address.contact_person_name},{address.house}
                      {address.address},{address.city}
                    </label>

                    <p
                      style={{
                        margin: "8px",
                        padding: "4px",
                        textAlign: "end",
                      }}
                      onClick={() =>
                        handleEditShow({ isAdd: 0, editAdd: address })
                      }
                    >
                      <GrEdit />
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <hr></hr>
            <div>
              <h5 className="checkOutTitle">Select your slot</h5>
              <br></br>
              <SlotPicker setSelectedSlot={setSelectedSlot} />
            </div>
            {/* slot ends */}
            <hr />
            {/* buttons start   */}
            <Row>
              <Col md={6}>
                <Button
                  className="payButton"
                  style={{
                    width: "80%",
                  }}
                  onClick={() => createOrder({ paymentType: 'cash_after_service' })}                 >
                  Pay Later
                </Button>
              </Col>

              <Col md={6}>
                <Button
                  className="payButton"
                  style={{
                    width: "80%",
                  }}
                  onClick={handlePayment}
                >
                  {" "}
                  pay now
                </Button>
                {/* <button onClick={handlePayment}>Pay with Razorpay</button> */}
              </Col>
            </Row>
            {/* buttons end  */}
          </div>
        </Col>
      </Row>
    </div>
  );
};
