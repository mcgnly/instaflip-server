var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});

export default () => {
    const email = {
      from: "Excited User <me@samples.mailgun.org>",
      to: "instaflip@mcgnly.com",
      subject: "Hello",
      text: `go check the droplet, someone uploaded a flipbook`,
    };
    // mailgun.messages().send(email, function(error, body) {
      console.log("email body", email, error);
    // });
  };