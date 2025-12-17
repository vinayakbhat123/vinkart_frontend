import { Input } from "@/components/ui/input";
import { Edit, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { BASE_URL } from "@/utils/constant";
import { toast } from "sonner";
import { setProducts } from "@/Redux/productsSlice";
import ImageUpload from "./ImageUpload";

// Alert-Dialog
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Adminproducts = () => {
  const { products } = useSelector((store) => store.product);
  const [editProduct, seteditProduct] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [searchTerm,setsearchterm] = useState("");
  const [sortorder,setsortorder] = useState("")
  const dispatch = useDispatch();
  
  let filteredProducts = products.filter((product) => 
  product.productName.toLowerCase().includes(searchTerm.toLowerCase) || 
  product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
  product.category.toLowerCase().includes(searchTerm.toLowerCase()));
  
  if(sortorder === "lowtoHigh"){
    filteredProducts = [...filteredProducts].sort((a,b) => a.productPrice - b.productPrice)
  }
  if(sortorder === "hightoLow"){
    filteredProducts = [...filteredProducts].sort((b,a) => b.productPrice - b.productPrice)
  }
  const handlechange = (e) => {
    const { name, value } = e.target;
    seteditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("productName", editProduct.productName);
    formdata.append("productPrice", editProduct.productPrice);
    formdata.append("productDesc", editProduct.productDesc);
    formdata.append("category", editProduct.category);
    formdata.append("brand", editProduct.brand);

    // Add existing images public_id
    const existingImages = editProduct.productImg
      .filter((img) => !(img instanceof File) && img.public_id)
      .map((img) => img.public_id);

    formdata.append("existingImages", JSON.stringify(existingImages));

    //Add new files
    editProduct.productImg
      .filter((img) => img instanceof File)
      .forEach((file) => {
        formdata.append("files", file);
      });

    try {
      const res = await axios.put(
        BASE_URL + `/updateproduct/${editProduct._id}`,
        formdata,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Product updates Succesfully");
        const updateproduct = products.map((item) =>
          item._id === editProduct._id ? res.data.product : item
        );
        dispatch(setProducts(updateproduct));
        setOpen(false);
      }
    } catch (error) {
      console.error("ERROR" + error);
    }
  };

  const deleteproducthandler = async (productId) => {
    try {
      const remainingProducts = products.filter(
        (item) => item._id !== productId
      );
      const res = await axios.delete(BASE_URL + `/deleteproduct/${productId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setProducts(remainingProducts));
      }
    } catch (error) {
      console.error("ERROR" + error);
    }
  };
  return (
    <div className="pl-[350px] py-20 pr-20 flex flex-col gap-3 min-h-screen bg-gray-100">
      <div className="flex justify-center-between">
        <div className="relative">
          <Input
            type={"text"}
            placeholder="search Products..."
            value={searchTerm}
            onChange={(e) => setsearchterm(e.target.value)}
            className={"w-[400px] items-center"}
          />
          <Search className="absolute right-3 top-1.5 text-gray-500" />
        </div>
        <Select onValueChange={(value) => setsortorder(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lowtoHigh">Price:Low to High</SelectItem>
            <SelectItem value="hightoLow">Price:High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {filteredProducts.map((product) => {
        return (
          <Card key={product._id} className={"px-4"}>
            <div className="flex items-center justify-between">
              <div className="flex-gap-2 items-center">
                <img
                  src={product?.productImg[0].url}
                  alt=""
                  className="w-25 h-25"
                />
                <h1 className="font-bold w-96 text-gray-700">
                  {product.productName}
                </h1>
              </div>
              <h1 className="font-semibold text-gray-800">
                {product.productPrice.toLocaleString("en-IN")}
              </h1>
              <div className="flex gap-3">
                <Dialog open={isOpen} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Edit
                      onClick={() => {
                        setOpen(true), seteditProduct(product);
                      }}
                      className="text-green-500 cursor-pointer"
                    />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px] max-h-[740px] overflow-y-scroll">
                    <DialogHeader>
                      <DialogTitle>Edit Product</DialogTitle>
                      <DialogDescription>
                        Make changes to your Product here. Click save when
                        you&apos;re done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                      <div className="grid gap-2">
                        <Label>Product Name</Label>
                        <Input
                          type={"text"}
                          name="productName"
                          value={editProduct?.productName}
                          onChange={handlechange}
                          placeholder="EX-iphone"
                          required
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label>Price</Label>
                        <Input
                          type={"number"}
                          name="productPrice"
                          value={editProduct?.productPrice}
                          onChange={handlechange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Brand</Label>
                          <Input
                            type={"text"}
                            name="brand"
                            value={editProduct?.brand}
                            onChange={handlechange}
                            placeholder="EX-apple"
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Category</Label>
                          <Input
                            type={"text"}
                            name="category"
                            value={editProduct?.category}
                            onChange={handlechange}
                            placeholder="EX-mobile"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label>Description</Label>
                        </div>
                        <Textarea
                          name="productDesc"
                          value={editProduct?.productDesc}
                          onChange={handlechange}
                          placeholder="Enter brief description of product"
                        />
                      </div>
                      <ImageUpload
                        productData={editProduct}
                        setProductData={seteditProduct}
                      />
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button onClick={handleSave}>Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Alert-dialogs */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                   <Trash2 className="text-red-500 cursor-pointer" />
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        remove the product from your store.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      <AlertDialogAction onClick={() => deleteproducthandler(product._id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default Adminproducts;
