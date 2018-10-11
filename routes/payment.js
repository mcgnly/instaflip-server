const stripe = require("../instaflipServerConstants/stripe");
const bodyParser = require("body-parser");

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};

const paymentApi = app => {
  app.use(bodyParser.json());

  app.post("/pay", (req, res) => {

    // example req.body  = { 
    //   source: 'tok_123456789',
    //   currency: 'EUR',
    //   amount: 2000,
    //   description: 'instaflip book for: katie',
    //   metadata: { order_id: 123456789 } 
    // }

    stripe.charges.create(req.body, postStripeCharge(res));
  });

  return app;
};

module.exports = paymentApi;
