const paypal = require("../../utils/paypal");
const OrderModel = require("../../models/OrderModel");
const ProductModel = require("../../models/ProductModels");
const CartModel = require("../../models/CartModel");

exports.createOrder = async (req, res) => {
  try {
    // TODO: ORDER STATUS & PAYMENT STATUS NEED TO BE PENDING IN THIS PHASE
    // TODO: IN THIS PART WE SAVE THE ORDER IN THE DATABASE, BUT ITS NOT COMPLETED YET
    // TODO: WE NEED TO RETURN THE APPROVAL URL TO THE FRONTEND
    // TODO: THE FRONTEND WILL REDIRECT THE USER TO THE PAYPAL PAGE
    // TODO: AFTER THE USER PAID, THE USER WILL BE REDIRECTED TO THE RETURN URL
    // TODO: WE NEED TO CAPTURE THE PAYMENT IN A DIFFERENT CONTROLLER
    // TODO: WE NEED TO UPDATE THE ORDER STATUS AND PAYMENT STATUS IN THE DATABASE

    const {
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;

    // if (
    //   !userId ||
    //   !cartId ||
    //   !cartItems ||
    //   !addressInfo ||
    //   !orderStatus ||
    //   !paymentMethod ||
    //   !paymentStatus ||
    //   !totalAmount ||
    //   !orderDate ||
    //   !orderUpdateDate ||
    //   !paymentId ||
    //   !payerId
    // ) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Missing required fields",
    //   });
    // }

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            total: totalAmount.toFixed(2),
            currency: "USD",
          },
          description: "Payment for order",
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.error(error, "error from CREATE PAYMENT - BACKEND");
        return res.status(500).json({
          success: false,
          message: "Error from `CREATE PAYMENT - BACKEND`",
          error: error.message,
        });
      } else {
        const newOrder = new OrderModel({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });

        await newOrder.save();

        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        return res.json({
          success: true,
          message: "Order created successfully",
          orderId: newOrder._id,
          approvalURL,
        });
      }
    });
  } catch (error) {
    console.error(error, "error from CREATE ORDER - BACKEND");
    return res.status(500).json({
      success: false,
      message: "Error from CREATE ORDER - BACKEND",
      error: error.message,
    });
  }
};

exports.capturePayment = async (req, res) => {
  try {
    const { orderId, paymentId, payerId } = req.body;

    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.paymentId = paymentId;
    order.payerId = payerId;
    order.paymentStatus = "paid";
    order.orderStatus = "completed";
    orderUpdateDate = new Date();

    // UPDATE STOCK QUANTITY IN THE DATABASE AFTER THE PAYMENT IS CAPTURED
    for (let item of order.cartItems) {
      let product = await ProductModel.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found`,
        });
      }

      product.totalStock -= item.quantity;
      await product.save();
    }

    const getCartId = order.cartId;
    await CartModel.findByIdAndDelete(getCartId);

    await order.save();

    return res.json({
      success: true,
      message: "Payment captured successfully",
      data: order,
    });
  } catch (error) {
    console.error(error, "error from CAPTURE PAYMENT - BACKEND");
    return res.status(500).json({
      success: false,
      message: "Error from CAPTURE PAYMENT - BACKEND",
      error: error.message,
    });
  }
};

exports.getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await OrderModel.find({ userId });
    console.log(orders, "orders from GET ALL ORDERS BY USER - BACKEND");
    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }
    return res.json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    console.error(error, "error from GET ALL ORDERS BY USER - BACKEND");
    return res.status(500).json({
      success: false,
      message: "Error from GET ALL ORDERS BY USER - BACKEND",
      error: error.message,
    });
  }
};

exports.getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    return res.json({
      success: true,
      message: "Order details fetched successfully",
      data: order,
    });
  } catch (error) {
    console.error(error, "error from GET ALL ORDERS BY USER - BACKEND");
    return res.status(500).json({
      success: false,
      message: "Error from GET ALL ORDERS BY USER - BACKEND",
      error: error.message,
    });
  }
};
