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
    updateBrand: (state, action) => {
      const index = state.brands.findIndex(
        (brand) => brand._id === action.payload._id
      );
      state.brands[index] = action.payload;
    },
    deleteBrand: (state, action) => {
      state.brands = state.brands.filter(
        (brand) => brand._id !== action.payload
      );
    },
  },
});

export const { setBrands, addBrand, updateBrand, deleteBrand } =
  brandSlice.actions;

export default brandSlice.reducer;
