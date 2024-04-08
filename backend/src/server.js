const express = require("express");
require("dotenv").config();
const router = require("./routes");
const connectDb = require("./config/connectDb");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.POST;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.URL_CLIENT);
  res.header(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT,PATCH, DELETE, OPTIONS, "
  );

  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

connectDb();
router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
