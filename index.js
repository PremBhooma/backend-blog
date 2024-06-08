const express = require("express");
const cors = require("cors");

const { connection } = require("./config/db");

const UserRouter = require("./routes/User.routes");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("HomeRoute is running");
});

// app.use("/blogs", blogRouter);
app.use("/api/user", UserRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("DB Connected Successfully");
  } catch (err) {
    console.log("DB Failed to Connect");
    console.log(err);
  }
  console.log(`Listening on ${PORT} Port`);
});
