const express = require("express");
const session = require("express-session");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8004;

// middle ware
app.use("/images", express.static("images"));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:4200"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    rolling: true, // <-- Set `rolling` to `true`
    cookie: {
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000,   // time out 1 Hour
    },
  })
);

// Import Controllers
const bookingcon = require("./controllers/booking");
const checkoutcon = require("./controllers/checkout");
const logincon = require("./controllers/login");
const registercon = require("./controllers/register");
const reportcon = require("./controllers/report");
const pay = require("./controllers/pay");

// Controllers
app.use("/api/booking", bookingcon);
app.use("/api/checkout", checkoutcon);
app.use("/api/report", reportcon);
app.use("/api/login", logincon);
app.use("/api/register", registercon);
app.use("/api/pay", pay);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`Press Ctrl+C to quit `);
});
