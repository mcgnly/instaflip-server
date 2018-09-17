const paymentApi = require("./payment");
const uploadApi = require("./upload");

const configureRoutes = app => {
	paymentApi(app);
	uploadApi(app);
};

module.exports = configureRoutes;
