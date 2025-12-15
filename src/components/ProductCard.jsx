import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCart } from "@/Redux/productsSlice";
const ProductCard = ({ product }) => {
  const { productName, productPrice, productImg, _id } = product;
  const dispatch = useDispatch();
  const addToCart = async ({ productId }) => {
    // TODO: Add to cart functionality
    try {
      const res = await axios.post(
        BASE_URL + "/addtocart",
        { productId },
        { withCredentials: true }
      );
      if (res?.data?.success) {
        toast.success("Product added to cart");
        dispatch(setCart(res?.data?.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getcart = async () => {
    try {
      const res = await axios.get(BASE_URL + "/getcart", {
        withCredentials: true,
      });
      if (res?.data?.success) {
        toast.success("You have product in cart");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getcart();
  }, []);

  return (
    <div className="shadow-lg rounded-lg overflow-hidden h-max">
      <div className="w-full h-full aspect-square overflow-hidden">
        <img
          src={productImg[0]?.url}
          alt={""}
          className="w-full h-full transition-duration-300 hover:scale-105 object-cover"
        />
      </div>
      <div className="px-2 space-y-1">
        <h1 className="font-semibold h-12 line-clamp-2">{productName}</h1>
        <h2 className="font-semibold text-lg">₹{productPrice?.toLocaleString("en-IN")}</h2>
        <Button
          onClick={() => addToCart({ productId: _id })}
          className="w-full mb-2 bg-pink-600  text-white hover:bg-pink-500"
        >
          <ShoppingCart />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
