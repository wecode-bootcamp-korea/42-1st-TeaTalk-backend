const orderService = require("../services/orderService");
//https://www.osulloc.com/kr/ko/shop/order?ids=2587208 (바로구매)
//https://www.osulloc.com/kr/ko/shop/order/result/2061612482 (결제하기)
// 바로구매버튼을 누른다 -> order 페이지(req: insert // res : product 정보(제품명, 수, 금액), user 정보, 를 select) -> 기본 배송지 저장되어있으면 delievereis 도 select
// 결제하기 버튼을 누른다 -> order result 페이지 -> 기본배송지 없으면 여기서 insert into deliveries 배송지 ->  (res : select 주문 정보)
// 장바구니 페이지 -> 결제금액 주문하기 버튼 누른다 -> 바로구매버튼과 동일한 페이지 ->
const getOrderPageForCartItems = async (req, res) => {
  try {
    const userId = req.user;

    if (!userId) {
      const error = new Error("KeyError!!");
      error.statusCode = 400;
      throw error;
    }

    const orderPage = await orderService.getOrderPageForCartItems(userId);

    return res.status(200).json(orderPage);
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
};

const orderResult = async (req, res) => {
  const userId = req.user;
  const {
    cart,
    totalPrice,
    deliveryPrice,
    receiverName,
    receiverPhoneNum,
    receiverZipcode,
    receiverAddress,
    deliveryMessage,
  } = req.body;

  if (
    !userId ||
    !cart ||
    !totalPrice ||
    !deliveryPrice ||
    !receiverName ||
    !receiverPhoneNum ||
    !receiverZipcode ||
    !receiverAddress
  ) {
    const error = new Error("keyError!!");
    error.statusCode = 400;
    throw error;
  }

  const result = await orderService.orderResult(
    userId,
    cart,
    totalPrice,
    deliveryPrice,
    receiverName,
    receiverPhoneNum,
    receiverZipcode,
    receiverAddress,
    deliveryMessage
  );

  return res.status(200).json(result);
};

module.exports = {
  getOrderPageForCartItems,
  orderResult,
};
