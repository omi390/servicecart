import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { CheckOutPage } from "./CheckOutPage";
import axios from "axios";

const BookingDetails = () => {
  const [bookDeatil, setookDeatil] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const fetchBookingDetail = async () => {
      try {
        const responseBook = await axios.get(
          `${process.env.REACT_APP_ENDPOINT}/customer/booking/6d6b1f8c-0041-419f-a538-609e0db272fd`,
          {
            headers: {
              zoneId: localStorage.getItem("zoneId"),
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (responseBook.data.response_code === "default_200") {
          console.log("book detail");
        }
        setookDeatil(responseBook.data.content);
        setAddress(responseBook.data.content.service_address);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookingDetail();
  }, []);

  return (
    <div className="container">
      <h5> BookingDetails </h5>
      <div>
        <Row>
        {bookDeatil ? (
          <>
                    <Col md={4} style={{ textAlign: "left" }}>

         <div>
         {bookDeatil.detail.map((item) => (
              <div>
                <h5 style={{fontSize:"24px",fontWeight:"700px"}}> ₹{item.total_cost} </h5>

                <br />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p
                    style={{
                      textAlign: "left",
                    }}
                  >
                    <div>
                      <span style={{ fontSize: "18px", fontWeight: "600" }}>
                        {item.service_name}
                      </span>
                      <br />

                      <span style={{ fontSize: "11px", fontWeight: "500" }}>
                        {item.variant_key}
                      </span>
                    </div>
                  
                  </p>
                  
                  <p
                    style={{
                      alignContent: "center",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    {" "}
                    {item.total_cost * item.quantity}
                  </p>
                </div>
              </div>
       
          ))}
          <hr/>
         </div>
         </Col>
        </>):(<></>)}
       
          <Col md={4}>
            <div className="bookDetailDiv">
            <h5 style={{fontSize:"16px",fontWeight:"600",textAlign:"left"}}>
                Payment <br />
                {bookDeatil ? (
                
                <span style={{fontWeight:"500"}}>
                  {bookDeatil.is_paid === 1 ? "paid" : "not paid"} </span>):(<></>)}
              </h5>
            </div>
          </Col>

          <Col md={4}>
            <div className="bookDetailDiv">
              <h5 style={{fontSize:"16px",fontWeight:"600",textAlign:"left"}}>
                Deliver To 🚚<br />
              </h5>
              {address ? (
                <>
                  {" "}
                  <p style={{textAlign:"left",fontSize:"14px"}}>
                  <span>{address.house}</span><br/>
                  <span>{address.address}</span><br/>
                  <span>{address.city}</span>
                  </p>
                </>
              ) : (
                <></>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BookingDetails;
