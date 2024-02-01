import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Navigate,Switch } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails.js";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import LoginSignUp from "./components/User/LoginSignUp.js";
import store from "./Store.js";
import { loadUser } from "./actions/userAction.js";
import UserOptions from "./components/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile.js";
import ProtectedRoute from "./components/Route/ProtectedRoute.js";
import UpdateProfile from "./components/User/UpdateProfile.js"
import UpdatePassword from "./components/User/UpdatePassword.js"
import ForgotPassword from "./components/User/ForgotPassword.js"
import ResetPassword from "./components/User/ResetPassword.js"
import Cart from "./components/Cart/Cart.js"
import Shipping from "./components/Cart/Shipping.js"
import ConfirmOrder from "./components/Cart/ConfirmOrder.js"
import OrderSuccess from "./components/Cart/OrderSuccess.js"
import Payment from "./components/Cart/Payment.js"
import MyOrders from "./components/Order/MyOrders.js"
import OrderDetails from "./components/Order/OrderDetails.js"
import Dashboard from "./components/admin/Dashboard.js"
import ProductList from "./components/admin/ProductList.js"

import { useEffect,useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import NewProduct from "./components/admin/NewProduct.js";
import UpdateProduct from "./components/admin/UpdateProduct.js";
import OrderList from "./components/admin/OrderList.js";
import ProcessOrder from "./components/admin/ProcessOrder.js";
import Userslist from "./components/admin/UsersList.js";
import UpdateUser from "./components/admin/UpdateUser.js";
import ProductReviews from "./components/admin/ProductReviews.js";
import Contact from "./components/layout/Contact/Contact.js";
import About from "./components/layout/About/About.js";
import NotFound from "./components/layout/Not Found/NotFound.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
   
  const [stripeApiKey,setStripeApiKey]=useState("");

  async function getStripeApiKey(){
    const {data}=await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={isAuthenticated? <Profile/>:<Navigate to ="/login"/>} />
        <Route path="/account" element={isAuthenticated? <Profile/>:<Navigate to ="/login"/>} />
        <Route path="/me/update" element={isAuthenticated? <UpdateProfile/>:<Navigate to ="/login"/>} />
        <Route path="/password/update" element={isAuthenticated? <UpdatePassword/>:<Navigate to ="/login"/>} />
        <Route path="/password/forgot" element={<ForgotPassword/>} /> 
        <Route path="/password/reset/:token" element={<ResetPassword/>} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={isAuthenticated? <Shipping/>:<Navigate to ="/login"/>} />
        <Route path="/success" element={isAuthenticated? <OrderSuccess/>:<Navigate to ="/login"/>} />
        <Route path="/orders" element={isAuthenticated? <MyOrders/>:<Navigate to ="/login"/>} />        
        <Route path="/order/confirm" element={isAuthenticated? <ConfirmOrder/>:<Navigate to ="/login"/>} />
        <Route path="/order/:id" element={isAuthenticated? <OrderDetails/>:<Navigate to ="/login"/>} />
        
        


        <Route path="/admin/dashboard" element={(isAuthenticated&&user.role==="admin")? <Dashboard/>:<Navigate to ="/login"/>} />
        <Route path="/admin/products" element={(isAuthenticated&&user.role==="admin")? <ProductList/>:<Navigate to ="/login"/>} />
        <Route path="/admin/product" element={(isAuthenticated&&user.role==="admin")? <NewProduct/>:<Navigate to ="/login"/>} />
        <Route path="/admin/product/:id" element={(isAuthenticated&&user.role==="admin")? <UpdateProduct/>:<Navigate to ="/login"/>} />
        <Route path="/admin/orders" element={(isAuthenticated&&user.role==="admin")? <OrderList/>:<Navigate to ="/login"/>} />
        <Route path="/admin/order/:id" element={(isAuthenticated&&user.role==="admin")? <ProcessOrder/>:<Navigate to ="/login"/>} />
        <Route path="/admin/users" element={(isAuthenticated&&user.role==="admin")? <Userslist/>:<Navigate to ="/login"/>} />
        <Route path="/admin/user/:id" element={(isAuthenticated&&user.role==="admin")? <UpdateUser/>:<Navigate to ="/login"/>} />
        <Route path="/admin/reviews" element={(isAuthenticated&&user.role==="admin")? <ProductReviews/>:<Navigate to ="/login"/>} />
       
        <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
       
           <Route path="/process/payment" element={isAuthenticated? <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>:<Navigate to ="/login"/>} />

            
            
      
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
