const express = require("express");
const morgan = require("morgan");
const dogsRouter = require("./routes/dogsRoutes");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/dogs", dogsRouter);

module.exports = app;
