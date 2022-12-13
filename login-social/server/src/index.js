const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportSetup = require("./helper/passport.social");
const authRouter = require("./routers/auth.router");

require('dotenv').config();

const app = express();
app.use(
    cors({
      origin: process.env.CLIENT_URL,
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );

app.use(
    cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);

const port = process.env.LISTEN_PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running with port ${port}`);
});

  