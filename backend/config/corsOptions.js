import allowedOrigins from "./allowedOrigins.js";

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed by Cors"));
    }
  },
  credentials: true,
  optionSuccessStatus: 200,
};

export default corsOptions;
