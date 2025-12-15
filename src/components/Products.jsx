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
import axios from "axios";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/Redux/productsSlice";

const Products = () => {
  const { products } = useSelector((state) => state.product);
  const [allproducts, setallproducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setloading] = useState(false);
  const [PriceRange, setPriceRange] = useState([0, 999999]);
  const [Search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [brand, setBrand] = useState("ALL");
  const dispatch = useDispatch();
  const getallproducts = async () => {
    try {
      setloading(true);
      const res = await axios.get(BASE_URL + "/getallproducts", {
        withCredentials: true,
      });

      if (res?.data?.success) {
        setallproducts(res.data.products);
        dispatch(setProducts(res.data.products));
      }
    } catch (error) {
      console.error("ERROR:", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (allproducts.length === 0) return;
    let filtered = [...allproducts];

    // Search Filter
    if (Search.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.productName?.toLowerCase().includes(Search.toLowerCase())
      );
    }
    // Category Filter
    if (category !== "ALL") {
      filtered = filtered.filter(
        (product) => product.category.toUpperCase() === category
      );
    }
    // Brand filter
    if (brand !== "ALL") {
      filtered = filtered.filter(
        (product) => product.brand.toUpperCase() === brand
      );
    }
    // Price Range Filter
    filtered = filtered.filter(
      (product) =>
        product.productPrice >= PriceRange[0] &&
        product.productPrice <= PriceRange[1]
    );

    //sortOrderPrice
    if (sortOrder === "lowtohigh") {
      filtered.sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortOrder === "hightolow") {
      filtered.sort((a, b) => b.productPrice - a.productPrice);
    }
    dispatch(setProducts(filtered));
  }, [Search, category, brand, PriceRange, sortOrder, allproducts, dispatch]);

  useEffect(() => {
    getallproducts();
  }, []);

  return (
    <div className="pt-20 pb-10">
      <div className="max-w-7xl mx-auto flex gap-7">
        {/* Filter Side Bar */}
        <FilterSideBar
          Search={Search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          brand={brand}
          setBrand={setBrand}
          allproducts={allproducts}
          PriceRange={PriceRange}
          setPriceRange={setPriceRange}
        />
        {/* Product Card List */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-end mb-4">
            <Select onValueChange={(value) => setSortOrder(value)}>
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
            {products.map((product) => (
              <div key={product._id}>
                <ProductCard product={product} loading={loading} />
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
