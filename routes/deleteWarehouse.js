const express = require("express");
const router = express.Router();
const fs = require("fs");

function readWarehouses() {
  let warehouseData = fs.readFileSync("./data/warehouses.json");
  const parsedWarehouses = JSON.parse(warehouseData);
  return parsedWarehouses;
}

function readInventory() {
  const inventoryData = fs.readFileSync("./data/inventories.json");
  const parsedInventory = JSON.parse(inventoryData);
  return parsedInventory;
}

// this get just one warehouse with its details and inventories
let writeInventoryWarehouse = (dataWarehouse, dataInvetory) => {
  const warehouseData = JSON.stringify(dataWarehouse);
  const invetoryData = JSON.stringify(dataInvetory);

  fs.writeFileSync("./data/warehouses.json", warehouseData);
  fs.writeFileSync("./data/inventories.json", invetoryData);
};

//this compare both data from warehouse and inventories and delete which has the same warehouse Id

router.delete("/:id", (req, res) => {
  let readinventory = readInventory();
  let readwarehouses = readWarehouses();

  let deleteInventory = readinventory.filter(
    (inventories) => inventories.warehouseID !== req.params.id
  );

  let deleteWareHouse = readwarehouses.filter(
    (warehouse) => warehouse.id !== req.params.id
  );

  writeInventoryWarehouse(deleteWareHouse, deleteInventory);
  res.status(204).send({ message: "warehouse deleted" + req.params.id });
});

module.exports = router;
