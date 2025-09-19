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
import { User, context, loading } from './Services/Interfaces';
import { removeToken, verifyToken } from './auth/TokenManager';
import ProductsPage from './Pages/ProductsPage';
import { getUserDetails } from './Services/ApiService';
import RegisterPage from './Pages/RegisterPage';
import ManageProductsPage from './Pages/ManageProductsPage';
import EditUserPage from './Pages/EditUserPage';
import CartPage from './Pages/CartPage';
import AddProductPage from './Pages/AddProductPage';
import ProductPage from './Pages/ProductPage';
import ResetPasswordPage from './Pages/ResetPasswordPage';
import Error404Page from './Pages/Error404Page';
import { ToastContainer } from 'react-toastify';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import 'react-toastify/dist/ReactToastify.css';
import ContactPage from './Pages/ContactPage';
import Loading from './Components/Loading';
import OrdersPage from './Pages/OrdersPage';
import AdminPage from './Pages/AdminPage';
import EditProductPage from './Pages/EditProductPage';
import AdminRouteGuard from './auth/AdminRouteGuard';
import BizRouteGuard from './auth/BizRouteGuard';
import LoginRouteGurard from './auth/LoginRouteGuard';
import RouteGuard from './auth/RouteGuard';


export const UserContext = createContext<context | null>(null);
export const LoadingContext = createContext<loading | null>(null);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [firstLoading, setFirstLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(verifyToken());
  const [userDetails, setUserDetails] = useState<User>();

  //Check for token when initilize app
  //If there is a token get user details by token from server
  useEffect(() => {
    if (verifyToken()) {
      const getUserDetailss = async () => setUserDetails(await getUserDetails())
      getUserDetailss()
        .then(() => {
          setFirstLoading(false)
          setIsLoading(false)
        })
        .catch((err) => {
          if (err)
            removeToken();
        });
    }
    else {
      setFirstLoading(false)
      setIsLoading(false)
    }
  }, [])

  return (
    <>
      <Loading isLoading={isLoading} />
      {!firstLoading &&
        <div className='containerr'>

          <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, userDetails, setUserDetails }}>
            <Navbar />
            <ToastContainer position='top-center' />
            <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
              <PayPalScriptProvider options={{"clientId": "AXsu4y0f0Y70h6d9kXi4w5Zki8f-1uHDPvTHLFt9l3jyLjzBSHawKLrPOr9GRXYTR6AT85BraFff3vxP" as string,currency: 'ILS'}}>
                <Routes>

                  <Route path='/' element={<HomePage />} />
                  <Route path='/about' element={<AboutPage />} />
                  <Route path='/contact' element={<ContactPage />} />
                  <Route path='/men' element={<GenderPage />} />
                  <Route path='/women' element={<GenderPage />} />
                  <Route path='/men/:category' element={<ProductsPage />} />
                  <Route path='/women/:category' element={<ProductsPage />} />
                  <Route path='/login' element={<LoginRouteGurard><LoginPage /></LoginRouteGurard>} />
                  <Route path='/register' element={<RegisterPage />} />
                  <Route path='/reset-password/:token' element={<LoginRouteGurard><ResetPasswordPage /></LoginRouteGurard>} />
                  <Route path='/manageproducts' element={<BizRouteGuard><ManageProductsPage /></BizRouteGuard>} />
                  <Route path='/manageproducts/addProduct' element={<BizRouteGuard><AddProductPage /></BizRouteGuard>} />
                  <Route path='/orders' element={<RouteGuard><OrdersPage /></RouteGuard>} />
                  <Route path='/favorites' element={<RouteGuard><FavoritesPage /></RouteGuard>} />
                  <Route path='/cart' element={<RouteGuard><CartPage /></RouteGuard>} />
                  <Route path='/account/:userId' element={<RouteGuard><EditUserPage /></RouteGuard>} />
                  <Route path='/product/:productId' element={<ProductPage />} />
                  <Route path='/editProduct/:productId' element={<BizRouteGuard><EditProductPage /></BizRouteGuard>} />
                  <Route path='/admin' element={<AdminRouteGuard><AdminPage /></AdminRouteGuard>} />
                  <Route path='/404' element={<Error404Page />} />
                </Routes>
              </PayPalScriptProvider>
            </LoadingContext.Provider>

            <Footer />
          </UserContext.Provider>
        </div>
      }
    </>
  );
}

export default App;
