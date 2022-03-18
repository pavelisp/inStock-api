const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");
const fs = require("fs");

function readInventory() {
  const inventoryData = fs.readFileSync("./data/inventories.json");
  const parsedInventory = JSON.parse(inventoryData);
  return parsedInventory;
}

function writeInventory(data) {
  const stringData = JSON.stringify(data);
  fs.writeFileSync("./data/inventories.json", stringData);
}

// this grab the Item and delete it from inventories
router.delete("/:id", (req, res) => {
  let findData = readInventory();
  let updateInventory = findData.filter((data) => data.id !== req.params.id);
  writeInventory(updateInventory);
  res.status(204).send(`Inventory Item delete ${req.params.id}`);
});

module.exports = router;
