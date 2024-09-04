import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./Main";
import "bootstrap/dist/css/bootstrap.min.css";
import MapWithModal from "./pages/MapWithModal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import LoginModal from "./pages/loginModal";
import SearchModal from "./pages/SearchModal";


function App() {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("token"));
  const [modalShow, setModalShow] = useState(false);

  //location map

  const [location, setLocation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);


  const handleProceed = (location) => {
    setLocation(location);
    setIsModalOpen(false);
    // Proceed to the next screen or handle the location data
    console.log("Location set:", location);
  };
  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleLoginCloseModal = () => {
    setIsLoginModalOpen(false);
  };
  useEffect(() => {
    const configApiCallFun = async () => {
      const configApiCall = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/customer/config`
      );
      console.log(configApiCall);
      localStorage.setItem(
        "imgBaseURL",
        configApiCall.data.content.image_base_url
      );
    
    };
    configApiCallFun();
    const zoneId = localStorage.getItem("zoneId");
    if (!zoneId) {
      setIsModalOpen(true);
    }
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogut = () => {
    setCurrentUser(null);
    localStorage.removeItem("token");
  };
  const handleLogin = () => {
    setCurrentUser(localStorage.getItem("user"));
  };

  const getToken = async () => {
    const url = `${process.env.REACT_APP_ENDPOINT}/customer/auth/login`;
    const data = {
      mobile: localStorage.getItem("mobile"),
    };
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.response_code === "auth_login_200") {
        console.log("successfull");
        const token =response.data.content.token;
        localStorage.setItem("token",token);
        handleLoginCloseModal();
        setCurrentUser(token);
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.log("something went wrong");
    }
  };
  const handleSearchModal = () =>{
    setModalShow(true);
  };
  

  return (
    <div className="App">
      <Header
        isModalOpen={setIsModalOpen}
        currentUser={currentUser}
        handleOpenLoginModal={handleOpenLoginModal}
        handleLogut={handleLogut}
        handleSearchModal=
        {handleSearchModal}
      />
      <div className="App-body">
        <Main currentUser={currentUser} handleLogin={handleLogin} />
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleLoginCloseModal}
        onProceed={getToken}
      />
      <MapWithModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onProceed={handleProceed}
      />
      {location && (
        <div>
          <p>Location set: {location.toString()}</p>
          <p>Proceed to the next screen...</p>
        </div>
      )}
      <SearchModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      </div>
  );
}

export default App;
