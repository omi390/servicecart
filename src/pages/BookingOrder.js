import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import moment from 'moment';



const BookingOrder = () => {
    const [bookingOrder, setBookingOrder] = useState([]);

    useEffect(() => {
        fetchBookingOrder(); 
    },[]);
    const fetchBookingOrder = async () => {
        try{
    const responseBooking = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/customer/booking`,
        {
          params: {
            offset: 1,
            limit: 15,
            booking_status:"all"
            },
        
          headers: {
            zoneId: localStorage.getItem("zoneId"),
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }

        );
        if(responseBooking.data.response_code === "default_200"){
            console.log("booking fetch", responseBooking.data.content.data
            );
            setBookingOrder(responseBooking.data.content.data);
        }
    }
    catch(error){
        console.log(error);
    }
    }
  
  return (
    <div className="container p-2 pb-4 mt-3 text-left">
      <h5 className='bookingTitle'><b className='pb-4  text-left '>Your Bookings</b></h5>
      <br></br>
    <Table className="table-bordered bookingTable">
    
      <thead>
        <tr>
          <th>Bookings ⭐</th>
          <th>Date🕐</th>
          <th>Payment ✔️</th>
          <th>Stauts 🚥</th>
          <th>Price 💲</th>

        </tr>
      </thead>
      <tbody>
        {bookingOrder.map((bookOrder)=>(

    
        <tr>
          <td style={{fontWeight:"600",color:"#9000aa"}}>#{bookOrder.readable_id}</td>
          <td>{moment(bookOrder.service_schedule).format('MMMM D, YYYY h:mm A')}</td>
          <td>{bookOrder.is_paid === 1 ? "paid":"unpaid"}</td>
          <td>{bookOrder.booking_status}</td>
          <td>{bookOrder.total_booking_amount}</td>

        </tr>
          ))}
      </tbody>
    </Table>
    </div>
  );
  
}

export default BookingOrder;