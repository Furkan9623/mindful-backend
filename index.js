const express = require("express");
const cors = require("cors");

const { createError, errorHandle } = require("./middleware/ErrorHandling");
const userRouter = require("./routers/user-router");
const mongodbConnect = require("./config/db");
const crudRouter = require("./routers/crud-router");
require("dotenv").config();
const app = express();
app.get("/", (req, res) => res.send("Application ready...."));
// app.use(express.static("dist"));
const port = process.env.SERVER_PORT;
// middleware
app.use(cors());
app.use(express.json());
app.use("/profile", express.static("./uploads"));
// router
app.use("/api/v1/user", userRouter);
app.use("/api/v1/crud-user", crudRouter);
// global error
app.use("*", async (req, res, next) =>
  next(
    createError(`${req.originalUrl} this url not found`, 500, "global error")
  )
);
app.use(errorHandle);
const server = app.listen(port, () =>
  console.log(`SERVER RUN ON PORT ${port}`)
);
// data base connect
mongodbConnect().catch((er) =>
  console.log(`Error Found While data connect ${er}`)
);
// if server connected
server.on("listening", () => console.log("server successfull connected"));
// if server not connect
server.on("error", (error) =>
  console.log(`Error found while server connected ${error}`)
);
