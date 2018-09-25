const stripe = require("../instaflipServerConstants/stripe");
const bodyParser = require("body-parser");

const postStripeCharge = res => (stripeErr, stripeRes) => {
  console.log("posting to stripe");
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};

const paymentApi = app => {
  app.use(bodyParser.json());

  app.get("/pay", (req, res) => {
    console.log('getting');
    res.send({
      message: "Hello Stripe checkout server!",
      timestamp: new Date().toISOString()
    });
  });

  app.post("/pay", (req, res) => {
    const { source, currency, amount, description } = req.body;
    const newBody = {
      // TODO why doesn't stripe accept these params?
      // "data-billing-address": true
      // args,
      source,
      currency,
      amount,
      description
    };
    stripe.charges.create(newBody, postStripeCharge(res));
  });



  return app;
};

module.exports = paymentApi;
