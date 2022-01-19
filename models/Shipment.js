const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema(
  {
    inventoryList: {
      type: [{ name: String, count: Number }],
      required: [true, "'inventoryList' field is required"],
    },
    direction: {
      type: String,
      enum: ["in", "out"],
      required: [true, "'direction' field is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Shipment = mongoose.model("Shipment", shipmentSchema);

module.exports = Shipment;
