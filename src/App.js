import React from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './Main';

function App() {
  return (

    <div className="App">
      <Header />
      <div className="App-body">
        <Main />
      </div>
    </div>
  );
}

export default App;
