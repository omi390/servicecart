import React from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const ServiceCard = ({ serviceDetails }) => {
  return (
    // <div>
      <Card  className="serviceCard" style={{ width: "18rem" }}>
        <Card.Img variant="top" className="cardImg" src="https://cdn.vectorstock.com/i/1000v/20/03/barber-shop-flat-design-vector-12722003.jpg" />
        <Card.Body className="cardDetails">
          <Card.Title>{serviceDetails.name}</Card.Title>
          <Card.Text>
          ₹ {serviceDetails.variations_app_format.default_price}
          </Card.Text>
        </Card.Body>
      </Card>
    // </div>
  );
};

export default ServiceCard;
