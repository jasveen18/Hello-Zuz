const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const body_parser = require('body-parser');


const app = express();

dotenv.config({path: './.env'});

const port = process.env.PORT;

require('./db/connection');

app.use(express.json());
app.use(cors());
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json({extended: true}));

app.use(require('./router/auth'));

app.listen(port, ()=>{
    console.log(`server running at port no. ${port}`);
});