require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(routes);

//health check
app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

const PORT = process.env.PORT;
const start = async () => {
  app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
  });
};

start();
