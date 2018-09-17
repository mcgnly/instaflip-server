const stripe = require("../constants/stripe");

const postStripeCharge = res => (stripeErr, stripeRes) => {
  console.log("posting to stripe");
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};

const paymentApi = app => {
  app.get("/", (req, res) => {
    res.send({
      message: "Hello Stripe checkout server!",
      timestamp: new Date().toISOString()
    });
  });

  app.post("/", (req, res) => {
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

  // app.post("/mail", (req, res) => {
  //   console.log("req", req.body, req.data, req.url);
  //   const { args, data } = req.body;
  //   const email = {
  //     from: "Excited User <me@samples.mailgun.org>",
  //     to: "instaflip@mcgnly.com",
  //     subject: "Hello",
  //     text: `Send flipbook to: ${args.billing_name}`,
  //     attachment: data
  //   };
  //   // enctype='multipart/form-data' for attachments to mailgun
  //   mailgun.messages().send(email, function(error, body) {
  //     console.log("email body", body, error);
  //   });
  // });

  return app;
};

module.exports = paymentApi;
