const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: process.env.PAY_PAL_MODE,
  client_id: process.env.PAY_PAL_CLIENT_ID,
  client_secret: process.env.PAY_PAL_CLIENT_SECRET,
});

module.exports = paypal;
