const express = require("express");
const router = express.Router();
const fs = require("fs");

//this compare both data from warehouse and inventories and return,
// the data with the same warehouse Id.
function getOneWarehouse(warehouseId) {
  let warehouse = fs.readFileSync("./data/warehouses.json");
  let inventories = fs.readFileSync("./data/inventories.json");

  const parsedWarehouses = JSON.parse(warehouse);
  const parsedInventories = JSON.parse(inventories);
  let getOneWarehouse = [];

  let Inventories = parsedInventories.filter(
    (inventories) => warehouseId === inventories.warehouseID
  );

  let oneWareHouse = parsedWarehouses.filter(
    (warehouse) => warehouseId === warehouse.id
  );

  getOneWarehouse.push(oneWareHouse, Inventories);

  return getOneWarehouse;
}

router.get("/:warehouseId", (req, res) => {
  res.status(200).json(getOneWarehouse(req.params.warehouseId));
});

module.exports = router;
