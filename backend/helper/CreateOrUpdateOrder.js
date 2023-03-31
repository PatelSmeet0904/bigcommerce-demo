const axios = require("axios");
const db = require("../config/db.js");
const Shop = db.shops;
const Order = db.orders;

const createOrUpdateOrder = async (storeId, orderId) => {
  // Retrieve the access token for the store from your database
  const shop = await Shop.findOne({ where: { store_id: storeId } });
  const accessToken = shop.access_token;
  // console.log("1", accessToken, orderId);

  // Use the BigCommerce API to fetch information about the new order
  const orderUrl = `${process.env.API_PATH}/v2/orders/${orderId}`;
  const response = await axios.get(orderUrl, {
    headers: {
      "X-Auth-Token": accessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const orderData = response.data;
  console.log(orderData.is_deleted);
  const [order, created] = await Order.upsert({
    id: orderData.id,
    customer_id: orderData.customer_id,
    status_id: orderData.status_id,
    status: orderData.status,
    total_ex_tax: orderData.total_ex_tax,
    total_tax: orderData.total_tax,
    payment_status: orderData.payment_status,
    is_deleted: orderData.is_deleted,
    products_url: orderData.products.url,
  });
};

module.exports = { createOrUpdateOrder };
