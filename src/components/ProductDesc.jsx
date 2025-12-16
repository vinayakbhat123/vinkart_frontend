import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BASE_URL } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { setCart } from "@/Redux/productsSlice";
import { useDispatch } from "react-redux";

const ProductDesc = ({ product }) => {
  const dispatch = useDispatch();
  const addToCart = async ({ productId }) => {
    // TODO: Add to cart functionality
    try {
      console.log(productId)
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
      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Response data:", error.response.data);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-4xl text-gray-800">
        {product.productName}
      </h1>
      <p className="text-gray-800">
        {product.category} | {product.brand}
      </p>
      <h2 className="text-pink-500 font bold text-2xl">
        ₹{product.productPrice.toLocaleString("en-IN")}
      </h2>
      <p className="line-clamp-10 text-muted-foreground">
        {product.productDesc}
      </p>
      <div className="flex gap-2 items-center w-[300px]">
        <p className="text-gray-800 font-semibold">Quantity:</p>
        <Input type={"number"} defaultValue={1} className={"w-15"} />
      </div>
      <Button
        className={"bg-pink-600 w-max hover:bg-pink-500"}
        onClick={() => addToCart({productId:product._id})}
      >
        Add To Cart
      </Button>
    </div>
  );
};

export default ProductDesc;
