import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
};

export const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      if (state.products === null) {
        state.products = [action.payload];
      } else {
        state.products = [...state.products, action.payload];
      }
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      state.products[index] = action.payload;
    },
  },
});

export const { setProducts, addProduct, updateProduct } = productSlice.actions;

export default productSlice.reducer;
