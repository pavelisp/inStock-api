const express = require('express');
const router = express.Router();
const fs = require('fs');

function readWarehouse(){
    let warehouseData = fs.readFileSync("./data/warehouses.json")
    const parsedWarehouses = JSON.parse(warehouseData);
    return parsedWarehouses
}

function writeWareHouses(data){
    const stringifiedData = JSON.stringify(data);
    fs.writeFileSync('./data/warehouses.json', stringifiedData);
}

router.post('/addWarehouse', (req,res) => {
    const warehouses = readWarehouses();
    const {name,
        address,
        city,
        country,
        contact,
        position,
        phone,
        email
        } = req.body; 
        
        if (!name){
            return res.status(400).json({
                message: "Warehouse name is REQUIRED!"
            })
        if (!address){
                return res.status(400).json({
                    message: "Warehouse address is REQUIRED!"
                }) 
        if (!city){
                return res.status(400).json({
                     message: "Warehouse city is REQUIRED!"
                    }) 
        if (!country){
                return res.status(400).json({
                message: "Warehouse country is REQUIRED!"
                        }) 
        if (!contact){
            return res.status(400).json({
                message: "Contact Name is REQUIRED!"
            }) 
        if (!position){
            return res.status(400).json({
                message: "Contact Position is REQUIRED!"
            })
        if (!phone || phone.length < 10){
            return res.status(400).json({
                message: "Phone Number is REQUIRED!"
            })
        if (!email){
            return res.status(400).json({
                message: "Warehouse name is REQUIRED!"
            });
            const newWarehouse = {name,
                address,
                city,
                country,
                contact,
                position,
                phone,
                email,
            };
            warehouses.push(newWarehouse)
            writeWareHouses(warehouses)
            res.status(201).json(newWarehouse)
        })
        
        module.exports=router