const express = require("express");
const { getShipments, createShipment } = require("../controllers/shipment");

const router = express.Router();

router.get("/", getShipments).post("/", createShipment);

module.exports = router;
