import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/users";
import authReducer from "./slices/auth";
import brandReducer from "./slices/brands";
import productReducer from "./slices/products";

const store = configureStore({
  reducer: {
    userData: userReducer,
    auth: authReducer,
    brandData: brandReducer,
    productData: productReducer,
  },
});

export default store;
