import { ShoppingCart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./button";

const Navbar = () => {
  const user = false;
  return (
    <header className="bg-pink-100 fixed w-full  z-20 border-pink-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3">
        {/* logo section */}
        <div className="">
          <img src="/vite.svg" alt="" className="w-[60px]" />
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
                <li>User Profile</li>
              </Link>
            )}
            <Link to={"/cart"} className="relative">
              <ShoppingCart />
              <span className="bg-pink-500 rounded-full absolute text-white -top-3 -right-5 px-2">
                0
              </span>
            </Link>
            {
              user ? <Button className={"bg-pink-500 text-white cursor-pointer hover:bg-pink-400"}>Logout</Button> :
               <Button className={`bg-linear-to-tl from-blue-600 to-purple-400 text-white cursor-pointer`}>Login</Button>
            }
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
