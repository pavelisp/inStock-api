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
function validation(req) {
  const {
    name,
    address,
    city,
    country,
    contact,
    position,
    phone,
    email
  } = req;

  if (!name) {
    return "name";
  }
  if (!address) {
    return "address";
  }
  if (!city) {
    return "city";
  }
  if (!country) {
    return "country";
  }
  if (!contact) {
    return "contact";
  }
  if (!position) {
    return "position";
  }
  if (!phone) {
    return "Number";
  }
  if (!email) {
    return "Email";
  }
  return "";
}
// Get all the warehouses at localhost:8080/warehouses/

router.get("/", (req, res) => {
  readWarehouses();
  res.status(200).send(readWarehouses());
});

router.post("/addWarehouse", (req, res) => {
  const warehouses = readWarehouses();

  const missingField = validation(req.body);
  if (missingField !== ""){
    return res.status(400).json({
      message: missingField + "is REQUIRED!"
    });
  }

  
    const newWarehouse = {
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      contact: req.body.contact,
      position: req.body.position ,
      phone: req.body.phone,
      email: req.body.email
    };
  
  warehouses.push(newWarehouse);
  writeWarehouses(warehouses);
  res.status(201).json(newWarehouse);
});

router.put("/:id/edit", (req, res) => {

  const missingField = validation(req.body);
  if (missingField !== ""){
    return res.status(400).json({
      message: missingField + " is REQUIRED!"
    });
  }
  const warehouses = readWarehouses();
  const warehouseId = req.param.id;
  const warehouseIndex = warehouses.findIndex(warehouse => {
    return warehouse.id === warehouseId;
  });
  const warehouse = warehouses[warehouseIndex];
  const {
    name,
    address,
    city,
    country,
    contact,
    position,
    phone,
    email
  } = req.body;

  warehouse.name = name;
  warehouse.address = address;
  warehouse.city = city;
  warehouse.country = country;
  warehouse.contact = contact;
  warehouse.position = position;
  warehouse.phone = phone;
  warehouse.email = email;

  warehouses[warehouseIndex] = warehouse;

  writeWarehouses(warehouses);
});

module.exports = router;
