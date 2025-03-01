// 所有私人行程小計

export const getPrivateOrdersTotalPrice = (order) => {
  if (!order || !order.selectedSlot || !order.selectedSlot.includes("-")) return 0;

  const [start, end] = order.selectedSlot.split("-");
  if (!start || !end) return 0;

  const startHour = parseInt(start.split(":")[0], 10);
  const endHour = parseInt(end.split(":")[0], 10);
  const duration = endHour - startHour;

  const adultPrice = order.tourguideInfo?.price_adult || 0;
  const childPrice = order.tourguideInfo?.price_child || 0;
  const adultCount = order.adultCount || 0;
  const childCount = order.childCount || 0;

  const privateOrdersSubtotal = adultCount * adultPrice * duration + childCount * childPrice * duration;
  return privateOrdersSubtotal;
};


// 單筆私人行程價格 (重複? )

export const getPrivateOrderPrice = (privateOrder) => {
  if (!privateOrder || !privateOrder.selectedSlot || !privateOrder.selectedSlot.includes("-")) {
    return "0 €";
  }

  // 取得時段範圍，例如 "09:00-11:00"
  const [start, end] = privateOrder.selectedSlot.split("-");
  if (!start || !end) {
    return "0 €";
  }

  // 解析小時數
  const startHour = parseInt(start.split(":")[0], 10);
  const endHour = parseInt(end.split(":")[0], 10);
  const duration = endHour - startHour; // 計算時長（小時）

  // 計算價格
  const adultPrice = privateOrder.tourguideInfo?.price_adult || 0;
  const childPrice = privateOrder.tourguideInfo?.price_child || 0;
  const adultCount = privateOrder.adultCount || 0;
  const childCount = privateOrder.childCount || 0;

  const privateOrderPrice = adultCount * adultPrice * duration + childCount * childPrice * duration;

  return `${privateOrderPrice} €`;
};