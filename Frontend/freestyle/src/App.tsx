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
import FavoritesPage from './Pages/FavoritesPage';
import GenderPage from './Pages/GenderPage';
import { User, context } from './Services/Interfaces';
import { removeToken, verifyToken } from './auth/TokenManager';
import ProductsPage from './Pages/ProductsPage';
import { getUserDetails } from './Services/ApiService';
import RegisterPage from './Pages/RegisterPage';
import ManageProductsPage from './Pages/ManageProductsPage';
import EditUserPage from './Pages/EditUserPage';
import CartPage from './Pages/CartPage';
import AddProductPage from './Pages/AddProductPage';


export const UserContext = createContext<context | null>(null);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(verifyToken());
  const [userDetails, setUserDetails] = useState<User>();

  //Check for token when initilize app
  //If there is a token get user details by token from server
  useEffect(() => {
    if (verifyToken()) {
      const getUserDetailss = async () => setUserDetails(await getUserDetails())
      getUserDetailss()
        .then(() => setIsLoading(false))
        .catch((err) => {
          if (err)
            removeToken();
        });
    }
    else
      setIsLoading(false)
  }, [])

  return (
    <>
      {!isLoading &&
        <div className='containerr'>

          <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, userDetails, setUserDetails }}>
            <Navbar />

            <Routes>

              <Route path='/' element={<HomePage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/men' element={<GenderPage />} />
              <Route path='/women' element={<GenderPage />} />
              <Route path='/men/:category' element={<ProductsPage />} />
              <Route path='/women/:category' element={<ProductsPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/manageproducts' element={<ManageProductsPage />} />
              <Route path='/manageproducts/addProduct' element={<AddProductPage />} />
              <Route path='/favorites' element={<FavoritesPage />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path='/account/:userId' element={<EditUserPage />} />
            </Routes>

            <Footer />
          </UserContext.Provider>
        </div>
      }
    </>
  );
}

export default App;
