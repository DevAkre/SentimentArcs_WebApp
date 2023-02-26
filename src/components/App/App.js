import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from '../Navbar.js';
import Home from '../Home/Home';
import Single from '../Single/Single';
import Ensemble from '../Ensemble/Ensemble';
import Help from '../Help/Help';
import Logout from '../Logout/Logout';
import Settings from '../Settings/Settings';


function App() {
  return (
    <div className="wrapper">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/single" element = {<Single/>}/>
        <Route path="/ensemble" element = {<Ensemble/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/help" element = {<Help/>}/>
        <Route path="/logout" element = {<Logout/>}/>
      </Routes>
      
    </div>   
  )
}

export default App;
