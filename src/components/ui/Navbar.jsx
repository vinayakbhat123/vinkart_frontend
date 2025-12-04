import { ShoppingCart } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./button";
import axios from "axios";
import { BASE_URL } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "@/Redux/userSlice";
import { addUser } from "@/Redux/userSlice";
import { useEffect } from "react";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true
        // headers: {"Content-Type": "application/json",},
      });

      // If we get a response, check the success flag
      if (response?.data?.success) {
        dispatch(addUser(response?.data?.user));
      } else {
        // This should not happen if the backend returns 400, because then it would be caught in the catch block.
        // But if the backend returns 200 with success false, then we handle it here.
        toast.error(response?.data?.message);
        navigate("/auth/login");
      }
    } catch (error) {
      console.error("ERROR:" + error);
      if (error.response) {
        // The request was made and the server responded with an error status
        if (error.response.status === 400) {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
      navigate("/auth/login");
    }
  };

  const handlelogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/auth/logout",
        {},
        { withCredentials: true }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
      dispatch(removeUser());
      return navigate("/auth/login");
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);
  return (
    <header className="bg-pink-100 fixed w-full  z-20 border-pink-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3">
        {/* logo section */}
        <div className="">
          <img src="/vinkartsvg.png" alt="" className="w-[150px] relative" />
        </div>
        {/* nav section */}
        <nav className="flex gap-10 justify-between items-center">
          <ul className="flex gap-7 items-center text-xl font-semibold">
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <Link to={"/products"}>
              <li>Products</li>
            </Link>
            {user && (
              <Link to={"/profile"}>
                <li>User {user ? user.firstName : "Name"} </li>
              </Link>
            )}
            <Link to={"/cart"} className="relative">
              <ShoppingCart />
              <span className="bg-pink-500 rounded-full absolute text-white -top-3 -right-5 px-2">
                0
              </span>
            </Link>
            {user ? (
              <Button
                className={
                  "bg-pink-500 text-white cursor-pointer hover:bg-pink-400"
                }
                onClick={handlelogout}
              >
                Logout
              </Button>
            ) : (
              <Link to={"/auth/login"}>
                {" "}
                <Button
                  className={`bg-linear-to-tl from-blue-600 to-purple-400 text-white cursor-pointer`}
                >
                  Login
                </Button>
              </Link>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
