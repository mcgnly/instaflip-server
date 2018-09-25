const cors = require("cors");

const CORS_WHITELIST = require("./instaflipServerConstants/frontend");

const corsOptions = {
	origin: (origin, callback) =>
		CORS_WHITELIST.indexOf(origin) !== -1
			? callback(null, true)
			: callback(new Error("Not allowed by CORS"))
};

const configureServer = app => {
	// app.use(cors(corsOptions));
	app.use(cors()); //default options allows all

	
};

module.exports = configureServer;
