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
  },
});

export const { setProducts, addProduct } = productSlice.actions;

export default productSlice.reducer;
