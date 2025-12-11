import { createSlice } from "@reduxjs/toolkit"

const ProductsSlice = createSlice({
  name:"product",
  initialState:{
    products:[],
    cart:[]
  },
  reducers:{
    setProducts:(state,action) => {
      state.products = action.payload;
    },
    setCart:(state,action) => {
      state.cart = action.payload;
    }
   }
});

export const {setProducts, setCart} = ProductsSlice.actions;

export default ProductsSlice.reducer;