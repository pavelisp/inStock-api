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

module.exports = router;