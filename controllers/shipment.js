const Shipment = require("../models/Shipment");
const InventoryItem = require("../models/InventoryItem");
const ErrorResponse = require("../utils/errorResponse");

const getShipments = async (req, res, next) => {
  try {
    const shipments = await Shipment.find({});
    const sortedByShipmentDate = shipments.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    // await Shipment.deleteMany({});
    res.send(sortedByShipmentDate);
  } catch (err) {
    next(err);
  }
};

const createShipment = async (req, res, next) => {
  try {
    const { inventoryList, direction } = req.body;

    if (direction !== "out" && direction !== "in")
      return next(
        new ErrorResponse("'direction' field can only be 'in' or 'out'.", 400)
      );

    const existingItems = await InventoryItem.find()
      .where("name")
      .in(inventoryList.map((item) => item.name));

    const newItemsInShipment = inventoryList.filter(
      (item) => existingItems.findIndex((i) => i.name === item.name) === -1
    );

    const existingItemsInShipmentMap = inventoryList
      .filter(
        (item) => existingItems.findIndex((i) => i.name === item.name) >= 0
      )
      .reduce((acc, curr) => ({ ...acc, [curr.name]: curr.count }), {});

    if (direction === "out" && newItemsInShipment.length > 0)
      return next(
        new ErrorResponse(
          "Shipment has inventory items that are not valid.",
          400
        )
      );

    let dir = 1;
    if (direction === "out") dir = -1;

    // update and create new inventory items
    // ideally check for if count drops below 0
    existingItems.forEach((item) => {
      item.count += dir * existingItemsInShipmentMap[item.name];
    });
    const promiseList = [];
    existingItems.forEach((item) => {
      promiseList.push(InventoryItem.findByIdAndUpdate(item._id, item));
    });
    await Promise.all(promiseList);

    // note that these newly add items will not have any description field
    if (direction === "in") await InventoryItem.insertMany(newItemsInShipment);

    const shipment = new Shipment({
      inventoryList,
      direction,
    });
    await shipment.save();
    res.send("Shipment created successfully.");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getShipments,
  createShipment,
};
