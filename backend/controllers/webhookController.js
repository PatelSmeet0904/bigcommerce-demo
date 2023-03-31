const { createOrUpdateOrder } = require("../helper/CreateOrUpdateOrder.js");

// @desc    Create Order Webhook
// @route   POST /webhook/createOrder
// @access  Private
const createOrder = async (req, res) => {
  const eventData = req.body;
  console.log(eventData);

  try {
    const orderId = eventData.data.id;
    const storeId = eventData.store_id;

    // // Store the order data in your database using Sequelize
    await createOrUpdateOrder(storeId, orderId);

    res.json({ Message: "Success!!" });
  } catch (error) {
    console.log(error.message);
  }
};

// @desc    Update Order Webhook
// @route   POST /webhook/updateOrder
// @access  Private
const updateOrder = async (req, res) => {
  const eventData = req.body;
  console.log(eventData);

  try {
    const orderId = eventData.data.id;
    const storeId = eventData.store_id;

    // // Store the order data in your database using Sequelize
    await createOrUpdateOrder(storeId, orderId);

    res.json({ Message: "Success!!" });
  } catch (error) {
    console.log(error.message);
  }
};

// @desc    Delete Order Webhook
// @route   POST /webhook/archiveOrder
// @access  Private
const archiveOrder = async (req, res) => {
  const eventData = req.body;
  console.log(eventData);

  try {
    const orderId = eventData.data.id;
    const storeId = eventData.store_id;

    // // Store the order data in your database using Sequelize
    await createOrUpdateOrder(storeId, orderId);

    res.json({ Message: "Success!!" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createOrder,
  updateOrder,
  archiveOrder,
};
