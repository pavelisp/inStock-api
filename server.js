const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config()
const inventoryList = require('./routes/inventory');


const SERVER_PORT = process.env.SERVER_PORT || 8080;
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use('/inventory', inventoryList);

app.listen(SERVER_PORT, () =>{
    console.log(`Server is listening on port ${SERVER_PORT}`)
});






