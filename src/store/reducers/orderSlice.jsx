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
      state.privateOrders = state.privateOrders.filter(
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

    setPrivateOrdersInfo: (state, action) => {
      state.privateOrders = action.payload;
    },
    setGroupOrdersInfo: (state, action) => {
      state.groupOrders = action.payload;
    },
    resetOrder: () => initialState,
  },
});



  // 🔹 計算價格的 Selector
export const selectTotalPrice = (state) => {


  if (!state.order || !state.order.privateOrders || state.order.privateOrders.length === 0) {
    return "Loading...";
  }
 

  // 取得時段範圍，例如 "09:00-11:00"
  const latestOrder = state.order.privateOrders[state.order.privateOrders.length -1]
  
 // 🛑 確保 selectedSlot 存在，否則返回 0 €
 if (!latestOrder.selectedSlot || !latestOrder.selectedSlot.includes("-")) {
  return "0 €";
}

  // 取得時段範圍，例如 "09:00-11:00"
  const [start, end] = latestOrder.selectedSlot.split("-");

  if (!start || !end) {
    return "0 €"; // 🛑 如果分割後不符合格式，返回 0 €
  }
  
  // 解析小時數
  const startHour = parseInt(start.split(":")[0], 10);
  const endHour = parseInt(end.split(":")[0], 10);
  const duration = endHour - startHour; // 計算時長（小時）
  
  
  // 計算價格
  const adultPrice = latestOrder.tourguideInfo?.price_adult || 0;
  const childPrice = latestOrder.tourguideInfo?.price_child || 0;
  const adultCount = latestOrder.adultCount || 0;
  const childCount = latestOrder.childCount || 0;
  
  const totalPrice = adultCount * adultPrice * duration + childCount * childPrice * duration;
  
  
  return `${totalPrice} €`;


}



export const { addPrivateOrder, removePrivateOrder, updatePrivateOrder, setPrivateOrdersInfo, setGroupOrdersInfo, resetOrder } =
  orderSlice.actions;

export default orderSlice.reducer;
