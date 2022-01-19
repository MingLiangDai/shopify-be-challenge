const express = require("express");
const bodyParser = require("body-parser");
const inventoryRoute = require("./routes/inventoryItem");
const shipmentRoute = require("./routes/shipment");
const connectToDB = require("./config/db");
const errorHandler = require("./middlewares/error");
const cors = require("cors");

const port = 5000;

// connect to database
connectToDB();

const app = express();
const jsonParser = bodyParser.json();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Routes
app.use("/items", jsonParser, inventoryRoute);
app.use("/shipments", jsonParser, shipmentRoute);

// Error handler middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// const uri = "";

// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });
