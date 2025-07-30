const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const databaseConnection = require("./database");
const feedbackRoutes = require("./routes/feedbackRoutes");
dotenv.config();
// database connection
databaseConnection();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/feedback", feedbackRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Port listening on ${PORT}`);
});
