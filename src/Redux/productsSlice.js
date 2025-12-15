import { createSlice } from "@reduxjs/toolkit"

const ProductsSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    cart: []
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addtocart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cart.find(item => item._id === product._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cart = state.cart.filter(item => item._id !== productId);
    },
    clearCart: (state) => {
      state.cart = [];
    }
  }
});

export const { setProducts, setCart, addtocart, removeFromCart, clearCart } = ProductsSlice.actions;

export default ProductsSlice.reducer;
