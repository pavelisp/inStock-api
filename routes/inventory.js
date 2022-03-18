const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');
const fs = require('fs');
const { REPL_MODE_SLOPPY } = require('repl');


function readInventory () {
    const inventoryData = fs.readFileSync('./data/inventories.json')
    const parsedInventory = JSON.parse(inventoryData);
    return parsedInventory;
}

function writeInventory(data){
    const stringData = JSON.stringify(data);
    fs.writeFileSync("./data/inventories.json",stringData);
}


router.get('/', (req, res) => {
    let inventoryData = readInventory()

    let allInventory = inventoryData.map(inventory => {
        return {
            id: inventory.id,
            warehouseID: inventory.warehouseID,
            warehouseName: inventory.warehouseName,
            itemName: inventory.itemName,
            description: inventory.description,
            category: inventory.category,
            status: inventory.status,
            quantity: inventory.quantity
        };
    });
    res.status(200).json(allInventory)
});


///Reads the inventory data, finds the item corresponding to the ID given in the url
///Then returns the data for a single item.
router.get("/:itemId",(req,res)=>{
    const inventoryData = readInventory();

    const singleItem = inventoryData.find(item => item.id === req.params.itemId)

    res.status(200).json(singleItem);
})


///Will connect to the Add Inventory Item page, and get the item name,desc,cate,status
///quantity and warehouse name + id. Then complile it into a new item data, and push it to
//the existing inventoryData. 
router.post("/",(req,res)=>{
    const inventoryData = readInventory();
    const {itemName,description, category, status, quantity, warehouseName} = req.body;
    const warehouseID = (inventoryData.find(warehouse => warehouse.warehouseName === warehouseName)).warehouseID;

    const newInventoryItem = {
        id: uuid(),
        warehouseID: warehouseID,
        warehouseName: warehouseName,
        itemName: itemName,
        description: description,
        category:category,
        status:status,
        quantity:quantity
    }

    inventoryData.push(newInventoryItem);

    writeInventory(inventoryData);

    res.status(201).json(newInventoryItem);

})

module.exports = router;