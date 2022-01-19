const mongoose = require("mongoose");

const inventoryItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "'name' field is required"],
      trim: true,
      maxlength: [
        10,
        "Name has to less than or equal to 10 characters in length",
      ],
    },
    description: {
      type: String,
      required: false,
      default: "",
      trim: true,
      maxlength: [
        500,
        "Description has to less than or equal to characters in length",
      ],
    },
    count: {
      type: Number,
      required: [true, "'count' field is required"],
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const InventoryItem = mongoose.model("InventoryItem", inventoryItemSchema);

module.exports = InventoryItem;
