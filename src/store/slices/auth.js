import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      return {
        isLogged: true,
        expireTime: +localStorage.getItem("expireTime"),
        user,
      };
    }
    return {
      isLogged: false,
      expireTime: 0,
      user: null,
    };
  },
  reducers: {
    login(state, action) {
      state.isLogged = true;
      state.user = action.payload;
      const currentTime = Date.now();
      const timeout = 1000 * 60 * 60 * 24 * 7;
      state.expireTime = currentTime + timeout;
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("expireTime", JSON.stringify(state.expireTime));
    },
    logout(state, action) {
      state.isLogged = false;
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("expireTime");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
