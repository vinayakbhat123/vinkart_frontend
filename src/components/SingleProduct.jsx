import React from "react";
import Breadcrums from "./Breadcrums";
import ProductImg from "./ProductImg";
import ProductDesc from "./ProductDesc";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const SingleProduct = () => {
  const { _id } = useParams();
  const { products } = useSelector((store) => store.product);

  console.log("Products in store:", products);
  console.log("Route _id:", _id);

  const product = products.find(
    (item) => String(item._id) === String(_id)
  );

  console.log("Found product:", product);

  if (!product) {
    return <div>Product not found or still loading...</div>;
  }

  return (
    <div className="pt-20 py-10 max-w-7xl mx-auto">
      <Breadcrums product={product} />
      <div className="mt-10 grid grid-cols-2 items-start">
        <ProductImg images={product.productImg} />
        <ProductDesc product={product} />
      </div>
    </div>
  );
};

export default SingleProduct;
