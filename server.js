const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config()


const SERVER_PORT = process.env.SERVER_PORT || 8080;
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.listen(SERVER_PORT, () =>{
    console.log(`Server is listening on port ${SERVER_PORT}`)
});




