import React from "react";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/ui/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path:"/",
    element:<><Navbar/><Home/></>
  },
  {
    path:"/auth/login",
    element:<><Login/></>
  },
  {
    path:"/auth/signup",
    element:<><Signup/></>
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