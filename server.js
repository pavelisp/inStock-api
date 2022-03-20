const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

const inventoryList = require("./routes/inventory");
const warehouseList = require("./routes/warehouses");
const getOneWareHouse = require("./routes/getOneWareHouse");
const deleteWareHouse = require("./routes/deleteWareHouse");
const deleteItemInventory = require("./routes/deleteItemInventory");

const SERVER_PORT = process.env.SERVER_PORT || 8080;
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/inventory", inventoryList);
app.use("/warehouses", warehouseList);
app.use("/warehouses", getOneWareHouse);
app.use("/warehouses/deletewarehouse", deleteWareHouse);
app.use("/warehouses/deleteitem", deleteItemInventory);

app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on port ${SERVER_PORT}`);
});
