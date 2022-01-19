const express = require("express");
const {
  getInventoryItems,
  createInventoryItem,
  deleteInventoryItem,
  deleteAllInventoryItems,
  updateInventoryItem,
} = require("../controllers/inventoryItems");

const router = express.Router();

router
  .get("/", getInventoryItems)
  .post("/", createInventoryItem)
  .put("/", updateInventoryItem)
  .delete("/", deleteAllInventoryItems)
  .delete("/:id", deleteInventoryItem);

module.exports = router;
