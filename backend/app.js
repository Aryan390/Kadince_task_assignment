// const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
// const mongoSanitize = require("express-mongo-sanitize");
// const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");

const app = express();

// set security HTTP HEADERS
app.use(helmet());

// development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!'
// })
// app.use('/api', limiter);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://kadince-task-assignment.vercel.app",
    credentials: true,
  })
);

// data sanitization against NoSQL query injection
// app.use(mongoSanitize());

// data sanitization against XSS
// app.use(xss());

app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

// Search Notes
// app.get("/search-notes");

// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

module.exports = app;
