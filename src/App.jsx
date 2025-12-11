import React from "react";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/ui/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import Products from "./components/Products";
import Cart from "./components/Cart";

const router = createBrowserRouter([
  {
    path:"/",
    element:<><Navbar/><Home/><Footer/></>
  },
  {
    path:"/auth/login",
    element:<><Login/></>
  },
  {
    path:"/auth/signup",
    element:<><Signup/></>
  },
   {
    path:"/auth/profile/:userId",
    element:<><Navbar/><Profile/></>
  },
  
   {
    path:"/products",
    element:<><Navbar/><Products/></>
  },
   {
    path:"/cart",
    element:<><Navbar/><Cart/></>
  }


])
const App = () => {
  return(
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;