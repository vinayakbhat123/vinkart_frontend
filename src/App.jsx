import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./components/ui/Navbar";
import Footer from "./components/Footer";
import AdminAuth from "./components/AdminAuth";

// Public pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Profile from "./components/Profile";

// Admin pages
import Dashboard from "./pages/Admin/Dashboard";
import AdminSales from "./pages/Admin/AdminSales";
import Addproduct from "./pages/Admin/Addproduct";
import Adminproducts from "./pages/Admin/Adminproducts";
import AdminOrders from "./pages/Admin/AdminOrders";
import Showusersorders from "./pages/Admin/Showusersorders";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminUserInfo from "./pages/Admin/AdminUserInfo";
import SingleProduct from "./components/SingleProduct";

const router = createBrowserRouter([
  // ================= PUBLIC ROUTES =================
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/signup",
    element: <Signup />,
  },
  {
    path: "/auth/profile/:userId",
    element: (
      <>
        <Navbar />
        <Profile />
      </>
    ),
  },
  
  {
    path: "/products",
    element: (
      <>
        <Navbar />
        <Products/>
      </>
    ),
  },
  {
    path: "/products/:_id",
    element: (
      <>
        <Navbar />
        <SingleProduct/>
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <Navbar />
        <Cart />
      </>
    ),
  },

  // ================= ADMIN ROUTES =================
  {
    element: <AdminAuth />, // 🔐 admin guard
    children: [
      {
        path: "/dashboard",
        element:<><Navbar/> <Dashboard /></>,
        children: [
          {
            path: "sales",
            element: <AdminSales />,
          },
          {
            path: "add-products",
            element: <Addproduct />,
          },
          {
            path: "admin-products",
            element: <Adminproducts />,
          },
          {
            path: "admin-orders",
            element: <AdminOrders />,
          },
          {
            path: "users/orders/:userId",
            element: <Showusersorders />,
          },
          {
            path: "admin-users",
            element: <AdminUsers />,
          },
          {
            path: "admin/userinfo/:id",
            element: <AdminUserInfo />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
