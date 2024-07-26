import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapWithModal from './pages/MapWithModal';

function App() {
  const [currentUser,setCurrentUser] = useState(localStorage.getItem('user'));

  useEffect(() => {
    const user = localStorage.getItem('user');
    if(user){
      setCurrentUser(user);
    }
  },[]);

  const handleLogut =() =>{
    setCurrentUser(null);
    localStorage.removeItem('user');
  }
  const handleLogin =() =>{
    setCurrentUser(localStorage.getItem('user'));
  }

  //location map 

  const [location, setLocation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleProceed = (location) => {
    setLocation(location);
    setIsModalOpen(false);
    // Proceed to the next screen or handle the location data
    console.log('Location set:', location);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <Header currentUser={currentUser} handleLogut={handleLogut} />
      <div className="App-body">
        <Main currentUser={currentUser} handleLogin={handleLogin}  />
      </div>
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

    </div>
  );
}

export default App;




