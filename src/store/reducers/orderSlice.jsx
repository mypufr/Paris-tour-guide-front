import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  privateOrders: [
    // {
    //   selectedDate: null,
    //   selectedSlot: null,
    //   adultCount: 1,
    //   childCount: 0,
    //   selectedTheme: "",
    //   tourguideInfo: {},
    // },
  ],
  groupOrders: [
    // {
    //   selectedDate: null,
    //   adultCount: 1,
    //   childCount: 0,
    //   selectedTour: "",
    //   tourguideInfo: {},
    //   tourInfo: {},
    // },
  ],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addPrivateOrder: (state, action) => {
      state.privateOrders.push(action.payload);
    },

    removePrivateOrder: (state, action) => {
      state.privateOrders.state.privateOrders.filter(
        (privateOrder) => privateOrder.id !== action.payload,
      );
    },

    updatePrivateOrder: (state, action) => {
      const { id, updatedData } = action.payload;
      const orderIndex = state.privateOrders.findIndex(
        (privateOrder) => privateOrder.id === id,
      );

      if (orderIndex !== -1) {
        state.privateOrders[orderIndex] = {
          ...state.privateOrders[orderIndex],
          ...updatedData,
        };
      }
    },

    setPrivateOrderInfo: (state, action) => {
      state.privateOrder = action.payload;
    },
    setGroupOrderInfo: (state, action) => {
      state.groupOrder = action.payload;
    },
    resetOrder: () => initialState,
  },
});

export const { addPrivateOrder, removePrivateOrder, updatePrivateOrder, setPrivateOrderInfo, setGroupOrderInfo, resetOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
