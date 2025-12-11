import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const FilterSideBar = ({
  Search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  allproducts,
  PriceRange,
  setPriceRange,
}) => {
  const categories = Array.from([
    "ALL",
    ...new Set(allproducts.map((product) => product.category)),
  ]);
  const brands = Array.from([
    "ALL",
    ...new Set(allproducts.map((product) => product.brand)),
  ]);

  const handlecategorychange = (value) => {
    setCategory(value);
  };

  const handlebrandchange = (e) => {
    setBrand(e.target.value);
  };
  const handleMinPriceChange = (e) => {
    const MinPrice = Number(e.target.value);
    if (MinPrice <= PriceRange[1]) setPriceRange([MinPrice, PriceRange[1]]);
  };
  const handleMaxPriceChange = (e) => {
    const MaxPrice = Number(e.target.value);
    if (MaxPrice >= PriceRange[0]) setPriceRange([PriceRange[0], MaxPrice]);
  };

  const reserFilters = () => {
    setSearch("");
    setCategory("ALL");
    setBrand("ALL");
    setPriceRange([0, 999999]);
  };

  return (
    <div className="bg-gray-100 mt-10 p-4 rounded-md h-max  md:block w-64 flex">
      {/* Search */}
      <Input
        type="text"
        placeholder="Search Products..."
        value={Search}
        onChange={(e) => setSearch(e.target.value)}
        className=" mb-4 bg-white p-2 border-gray-400 border-2 w-full"
      />
      {/* category */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div>
        {categories.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="radio"
              checked={category === item.toUpperCase()}
              onChange={() => handlecategorychange(item.toUpperCase())}
            />
            <label htmlFor={""} className="capitalize">
              {item}
            </label>
          </div>
        ))}
      </div>

      {/* brands */}
      <h1 className="mt-5 font-semibold text-xl">Brands</h1>
      <select className="bg-white w-full p-2 border-gray-200 " value={brand} onChange={handlebrandchange}>
        {brands.map((brand, index) => (
          <option key={index} value={brand.toUpperCase()}>
            {brand.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Price */}
      <h1 className="font-semibold text-xl mt-5 mb-3">Price range</h1>
      <div className="flex flex-col gap-2">
        <label>
          Price Range: ₹{PriceRange[0]} - ₹{PriceRange[1]}
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            min={0}
            max={5000}
            value={PriceRange[0]}
            onChange={handleMinPriceChange}
            className="w-20 border border-gray-300 rounded p-1"
          />
          <span>-</span>
          <input
            type="number"
            min={0}
            max={999999}
            value={PriceRange[1]}
            onChange={handleMaxPriceChange}
            className="w-20 border border-gray-300 rounded p-1"
          />
        </div>
        <input type="range" min={0} max={5000} value={PriceRange[0]} onChange={handleMinPriceChange} step={100} className="w-full" />
        <input type="range" min={5000} max={999999}  step={100} value={PriceRange[1]} onChange={handleMaxPriceChange} className="w-full" />
      </div>
      {/* Reset Filter */}
      <Button className={"w-full bg-pink-600 cursor-pointer text-white hover:bg-pink-500 mt-5"} onClick={reserFilters}
      >
        Reset Filter
      </Button>
    </div>
  );
};

export default FilterSideBar;
