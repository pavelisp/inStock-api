const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");
const fs = require("fs");
const { REPL_MODE_SLOPPY } = require("repl");

function readInventory() {
  const inventoryData = fs.readFileSync("./data/inventories.json");
  const parsedInventory = JSON.parse(inventoryData);
  return parsedInventory;
}

function writeInventory(data) {
  const stringData = JSON.stringify(data);
  fs.writeFileSync("./data/inventories.json", stringData);
}

function isInStock(status){
    if(status){
        return "In Stock"
    }
    else if(status === false){
        return "Out of Stock"
    }
}
router.get("/", (req, res) => {
  let inventoryData = readInventory();

  let allInventory = inventoryData.map((inventory) => {
    return {
      id: inventory.id,
      warehouseID: inventory.warehouseID,
      warehouseName: inventory.warehouseName,
      itemName: inventory.itemName,
      description: inventory.description,
      category: inventory.category,
      status: inventory.status,
      quantity: inventory.quantity,
    };
  });
  res.status(200).json(allInventory);
});

///Reads the inventory data, finds the item corresponding to the itemName and warehouse given
///Then returns the data for a single item.
router.get("/itemDetails", (req, res) => {
  const inventoryData = readInventory();
  const {itemName,warehouse} = req.body

  const singleItem = inventoryData.filter(item => item.itemName === itemName && item.warehouseName === warehouse)[0];

  res.status(200).json(singleItem);
});

///Will connect to the Add Inventory Item page, and get the item name,desc,cate,status
///quantity and warehouse name + id. Then complile it into a new item data, and push it to
//the existing inventoryData.
router.post("/", (req, res) => {
  const inventoryData = readInventory();
  const { itemName, description, category, status, quantity, warehouseName } =
    req.body;
  const warehouseID = inventoryData.find(
    (warehouse) => warehouse.warehouseName === warehouseName
  ).warehouseID;

    const newInventoryItem = {
        id: uuid(),
        warehouseID: warehouseID,
        warehouseName: warehouseName,
        itemName: itemName,
        description: description,
        category:category,
        status:isInStock(status),
        quantity:parseInt(quantity)
    }

  inventoryData.push(newInventoryItem);

  writeInventory(inventoryData);

  res.status(201).json(newInventoryItem);
});



///Edits an existing item by using the data sent by the form and filtering out the correct item we need by using the itemName and warehouseName
///Then it edits the values within the item and pushes it back into the original json file. Then writes over the inventories file with the new
///item in it.
router.post("/editItem", (req,res)=>{
    const inventoryData = readInventory();
    const {itemName,description,category,status,warehouse} = req.body;

    const singleItem = inventoryData.filter(item => item.itemName === itemName && item.warehouseName === warehouse)[0];
    const singleItemIndex = inventoryData.findIndex(item => item.itemName === itemName && item.warehouseName === warehouse);

    singleItem.description = description; singleItem.category = category; singleItem.status = isInStock(status);

    inventoryData.splice(singleItemIndex,1,singleItem);

    writeInventory(inventoryData);

    res.status(201).json(singleItem)

})

module.exports = router;
