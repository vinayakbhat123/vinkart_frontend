import React, { useEffect, useState } from "react";
import FilterSideBar from "./FilterSideBar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BASE_URL } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import ProductCard from "./ProductCard";

const Products = () => {
  const [allproducts, setallproducts] = useState([]);
  const [loading,setloading] = useState(false);
  const getallproducts = async () => {
    try {
      setloading(true);
      const res = await axios.get(BASE_URL + "/getallproducts", {
        withCredentials: true,
      });

      if (res?.data?.success) {
        setallproducts(res.data.products);
      }
    } catch (error) {
      console.error("ERROR:", error);
      toast.error(
        error?.response?.data?.message || "An error occurred. Please try again."
      );
    }finally{
      setloading(false);
    }
  };

  useEffect(() => {
    getallproducts();
  }, []);
  
  return (
    <div className="pt-20 pb-10">
      <div className="max-w-7xl mx-auto flex gap-7">
        {/* Filter Side Bar */}
        <FilterSideBar allproducts={allproducts}/>
        {/* Product Card List */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-end mb-4">
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort by Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>Fruits</SelectLabel> */}
                  <SelectItem value="lowtohigh">Price: Low to High</SelectItem>
                  <SelectItem value="hightolow">Price: High to Low</SelectItem>
                  {/* <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem> */}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/*product grid*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
            {allproducts.map((product) => (
              <div key={product._id}>
                <ProductCard product={product}loading={loading} />
              </div>
            ))}
          </div>
        </div>
      </div>
      Produts
    </div>
  );
};

export default Products;
