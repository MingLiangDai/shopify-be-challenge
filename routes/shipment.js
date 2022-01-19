const express = require("express");
const {
  getShipments,
  createShipment,
  deleteShipment,
  deleteAllShipments,
} = require("../controllers/shipment");

const router = express.Router();

router
  .get("/", getShipments)
  .post("/", createShipment)
  .delete("/", deleteAllShipments)
  .delete("/:id", deleteShipment);

module.exports = router;
