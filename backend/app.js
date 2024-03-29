const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const { environment } = require("./config");
const isProduction = environment === "production";

const { ValidationError } = require("sequelize");

const routes = require("./routes");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
if (!isProduction) {
  app.use(cors());
}
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);
app.use(routes);
app.use((_req, _res, next) => {
    const err = new Error("The requested resource could not be found");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource could not be found"];
    err.status = 404;
    next(err);
});
app.use((err, _req, _res, next) => {
    if (err instanceof ValidationError) {
        err.title = "Validation Error";
        err.errors = err.errors.map((e) => e.message);
    }
    next(err);
});
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    })
})

module.exports = app;
