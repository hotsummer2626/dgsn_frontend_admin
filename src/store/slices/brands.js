import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: null,
};

export const brandSlice = createSlice({
  name: "Brand",
  initialState,
  reducers: {
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
    addBrand: (state, action) => {
      if (state.brands === null) {
        state.brands = [action.payload];
      } else {
        state.brands = [...state.brands, action.payload];
      }
    },
  },
});

export const { setBrands, addBrand } = brandSlice.actions;

export default brandSlice.reducer;
