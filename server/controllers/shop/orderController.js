const paypal = require("../../utils/paypal");
const OrderModel = require("../../models/OrderModel");

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

    if (
      !userId ||
      !cartId ||
      !cartItems ||
      !addressInfo ||
      !orderStatus ||
      !paymentMethod ||
      !paymentStatus ||
      !totalAmount ||
      !orderDate ||
      !orderUpdateDate ||
      !paymentId ||
      !payerId
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:3000/shop/paypal-return",
        cancel_url: "http://localhost:3000/shop/paypal-cancel",
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

    paypal.payments.create(create_payment_json, async (error, paymentInfo) => {
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
  } catch (error) {
    console.error(error, "error from CAPTURE PAYMENT - BACKEND");
    return res.status(500).json({
      success: false,
      message: "Error from CAPTURE PAYMENT - BACKEND",
      error: error.message,
    });
  }
};
