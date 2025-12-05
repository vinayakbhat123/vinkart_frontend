import React from "react";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/ui/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import Profile from "./components/Profile";

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