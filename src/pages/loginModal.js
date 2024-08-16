import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { toast } from "react-toastify";

const LoginModal = ({ isOpen, onClose, onProceed }) => {
  let subtitle;

  const [showOTPForm, setShowOTPForm] = useState(false);

  const [login, setLogin] = useState({
    identity: "",
  });

  const [otpForm, setOtpForm] = useState({
    otp: "",
  });

  const data = {
    identity: "+91" + login.identity,
    identity_type: "phone",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };
  const handleOtpChange = (e) => {
    const { name, value } = e.target;
    setOtpForm((preOtpForm) => ({
      ...preOtpForm,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    const url = `${process.env.REACT_APP_ENDPOINT}/user/verification/send-otp`;

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.response_code === "default_200") {
        console.log("OTP sent Succesfluly");
        setShowOTPForm(true);
        localStorage.setItem("mobile", login.identity);
        toast.success("OTP Sent Successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleOTPSubmit = async (e) => {
    const url = `${process.env.REACT_APP_ENDPOINT}/user/verification/verify-otp`;
    const data = {
      identity: "+91" + login.identity,
      identity_type: "phone",
      otp: otpForm.otp,
    };
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.response_code == "default_200") {
        console.log("Logged In Succesfluly");
        setShowOTPForm(true);
        localStorage.setItem("mobile", login.identity);
        toast.success("Logged In Succesfluly");

        //api call to get token
        onProceed();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    // <div >
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Set Location"
      // ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "40%",
          height: "40%",
          borderRadius: "7px",
        },
      }}
    >
      <h5 className="login-title">Login/Sign up</h5>
      {showOTPForm ? (
        <div>
          <p className="">Enter Otp For {login.identity}</p>

          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">OTP</InputGroup.Text>
            <Form.Control
              name="otp"
              value={otpForm.otp}
              onChange={handleOtpChange}
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>
          <Form.Group className="check-btn" id="formGridCheckbox">
            <Form.Check type="checkbox" label="Get order on whatsapp" />
          </Form.Group>
          <Button onClick={handleOTPSubmit} className="login-btn" size="sm">
            Submit OTP
          </Button>
        </div>
      ) : (
        <div className="numberDiv">
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">+91</InputGroup.Text>
            <Form.Control
              name="identity"
              value={login.identity}
              onChange={handleChange}
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>
          <Form.Group className="check-btn" id="formGridCheckbox">
            <Form.Check type="checkbox" label="Get order on whatsapp" />
          </Form.Group>
          <Button onClick={handleSubmit} className="login-btn" size="sm">
            Proceed
          </Button>
        </div>
      )}
      {/* <button onClick={onClose}>Cancel</button> */}
      {/* <div>I am a modal</div> */}
    </Modal>
    // </div>
  );
};

export default LoginModal;
