const express = require("express");
const routes = require("./routes/index");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

<<<<<<< HEAD

const allowedOrigins = [
  "https://milestone-tracker-iota.vercel.app",
  "http://localhost:5173"
];
=======
const allowedOrigins = [
  "https://milestone-tracker-iota.vercel.app",
  "http://localhost:5173"
]
>>>>>>> 6230b2ea83fa3ba23dece4ac694628fcbc32e7c2

app.use(cors({
  origin: allowedOrigins,
  credentials: true
<<<<<<< HEAD
}));
=======
}))
>>>>>>> 6230b2ea83fa3ba23dece4ac694628fcbc32e7c2

app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.json({limit: "16kb"}))
app.use(cookieParser())

app.use("/api", routes);
  

module.exports = app;
