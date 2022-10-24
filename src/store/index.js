import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/users";
import authReducer from "./slices/auth";

const store = configureStore({
  reducer: {
    userData: userReducer,
    auth: authReducer,
  },
});

export default store;
