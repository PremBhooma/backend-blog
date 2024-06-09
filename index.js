const express = require("express");
const cors = require("cors");

const { connection } = require("./config/db");

const UserRouter = require("./routes/User.routes");
const BlogRouter = require("./routes/Blog.routes");

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

app.use("/api/user", UserRouter);
app.use("/api/blog", BlogRouter);

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
