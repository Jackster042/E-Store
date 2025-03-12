const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "Aa-8JQBBdPMoSyzl5rwdcG10BJ5_O9d_q6phAHXF9EEgF34Jlx6teQx9Oi1cmyAUp0JCdGPE-Ef5dipm",
  client_secret:
    "EJgSOs4_uLIVL8lisR4MJ4PRJmpNoU73zLfaD0PMf2gSRM_ApXOi7e_mtdpVO0vr2Tw9qtzsJ1t5IX-c",
});

module.exports = paypal;
