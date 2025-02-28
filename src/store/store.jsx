import { configureStore } from "@reduxjs/toolkit";

import orderReducer from "./reducers/orderSlice.jsx";

export const store = configureStore({
  reducer: {
    order: orderReducer,
  }
})

export default store;