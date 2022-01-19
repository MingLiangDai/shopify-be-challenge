const InventoryItem = require("../models/InventoryItem");
const ErrorResponse = require("../utils/errorResponse");

const getInventoryItems = async (req, res, next) => {
  try {
    const inventoryItems = await InventoryItem.find({});
    const sortedByCreationDate = inventoryItems.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (err) {
    next(err);
  }
};

const createInventoryItem = async (req, res, next) => {
  try {
    const { name, description, count } = req.body;
    const inventoryItem = new InventoryItem({
      name,
      description,
      count,
    });
    await inventoryItem.save();
    res.send("Inventory item created successfully.");
  } catch (err) {
    next(err);
  }
};

const updateInventoryItem = async (req, res, next) => {
  try {
    const inventoryItem = await InventoryItem.findByIdAndUpdate(
      req.body._id,
      req.body
    );
    if (!inventoryItem)
      return next(
        new ErrorResponse(
          `Inventory Item with id ${req.body.id} is not found`,
          400
        )
      );
    res.send("Inventory item updated successfully.");
  } catch (err) {
    next(err);
  }
};

const deleteInventoryItem = async (req, res, next) => {
  try {
    const inventoryItem = await InventoryItem.findByIdAndRemove(req.params.id);
    if (!inventoryItem)
      return next(
        new ErrorResponse(
          `Inventory Item with id ${req.params.id} is not found`,
          400
        )
      );
    res.send("Inventory item deleted successfully.");
  } catch (err) {
    next(err);
  }
};

const deleteAllInventoryItems = async (req, res, next) => {
  try {
    const inventoryItems = await InventoryItem.deleteMany({});
    res.send(
      `${inventoryItems.deletedCount} inventory items deleted successfully.`
    );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getInventoryItems,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  deleteAllInventoryItems,
};
