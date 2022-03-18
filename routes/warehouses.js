const express = require("express");
const router = express.Router();
const fs = require("fs");

let warehouses = {};

// Read warehouses function, use readWarehouses() to update the list

function readWarehouses() {
  let warehouseData = fs.readFileSync("./data/warehouses.json");
  const parsedWarehouses = JSON.parse(warehouseData);
  return parsedWarehouses;
}

function writeWarehouses(data) {
  const stringifiedData = JSON.stringify(data);
  fs.writeFileSync("./data/warehouses.json", stringifiedData);
}

function getOneWarehouse(warehouseId) {
  let warehouse = fs.readFileSync("./data/warehouses.json");
  let inventories = fs.readFileSync("./data/inventories.json");
  const parsedWarehouses = JSON.parse(warehouse);
  const parsedInventories = JSON.parse(inventories);
  let getOne = [];

  let oneInventories = parsedInventories.find(
    (inventories) => warehouseId === inventories.warehouseID
  );

  let oneWareHouse = parsedWarehouses.find(
    (warehouse) => warehouseId === warehouse.id
  );

  getOne.push(oneWareHouse, oneInventories);

  return getOne;
}
// Get all the warehouses at localhost:8080/warehouses/

router.get("/", (req, res) => {
  readWarehouses();
  res.status(200).send(readWarehouses());
});

router.get("/:warehouseId", (req, res) => {
  getOneWarehouse();
  res.status(200).json(getOneWarehouse(req.params.warehouseId));
});

router.post("/addWarehouse", (req, res) => {
  const warehouses = readWarehouses();
  const { name, address, city, country, contact, position, phone, email } =
    req.body;

  if (!name) {
    return res.status(400).json({
      message: "Warehouse name is REQUIRED!",
    });
  }
  if (!address) {
    return res.status(400).json({
      message: "Warehouse address is REQUIRED!",
    });
  }
  if (!city) {
    return res.status(400).json({
      message: "Warehouse city is REQUIRED!",
    });
  }
  if (!country) {
    return res.status(400).json({
      message: "Warehouse country is REQUIRED!",
    });
  }
  if (!contact) {
    return res.status(400).json({
      message: "Contact Name is REQUIRED!",
    });
  }
  if (!position) {
    return res.status(400).json({
      message: "Contact Position is REQUIRED!",
    });
  }
  if (!phone) {
    return res.status(400).json({
      message: "Phone Number is REQUIRED!",
    });
  }
  if (!email) {
    return res.status(400).json({
      message: "Email is REQUIRED!",
    });
  }
  const newWarehouse = {
    name,
    address,
    city,
    country,
    contact,
    position,
    phone,
    email,
  };
  warehouses.push(newWarehouse);
  writeWarehouses(warehouses);
  res.status(201).json(newWarehouse);
});

module.exports = router;
