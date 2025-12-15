import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/ui/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Dashboard from "./pages/Admin/Dashboard";
import AdminSales from "./pages/Admin/AdminSales";
import Addproduct from "./pages/Admin/Addproduct";
import Adminproducts from "./pages/Admin/Adminproducts";
import AdminOrders from "./pages/Admin/AdminOrders";
import Showusersorders from "./pages/Admin/Showusersorders";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminUserInfo from "./pages/Admin/AdminUserInfo";
import AdminAuth from "./components/AdminAuth";

const router = createBrowserRouter([
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
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/auth/signup",
    element: (
      <>
        <Signup />
      </>
    ),
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
        <Products />
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
  {
    element: <AdminAuth />,
    children: [
      {
        path: "/dashboard",
        element: (
          <>
            <Dashboard />
          </>
        ),
        children: [
          {
            path: "sales", // relative path
            element: (
              <>
                <AdminSales />
              </>
            ),
          },
          {
            path: "add-products", // relative path
            element: (
              <>
                <Addproduct />
              </>
            ),
          },
          {
            path: "admin-products", // relative path
            element: (
              <>
                <Adminproducts />
              </>
            ),
          },
          {
            path: "admin-orders", // relative path
            element: (
              <>
                <AdminOrders />
              </>
            ),
          },
          {
            path: "users/orders/:userId", // relative path
            element: (
              <>
                <Showusersorders />
              </>
            ),
          },
          {
            path: "admin-users", // relative path
            element: (
              <>
                <AdminUsers />
              </>
            ),
          },
          {
            path: "admin/userinfo/:id", // relative path
            element: (
              <>
                <AdminUserInfo />
              </>
            ),
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
