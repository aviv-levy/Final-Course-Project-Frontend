import React, { createContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap'
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import LoginPage from './Pages/LoginPage';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

function App() {
  return (
    <>
      <div className='containerr'>

        <Navbar />

        <Routes>

          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/login' element={<LoginPage />} />

        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
