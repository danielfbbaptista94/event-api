const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
const connection = require('../db/connection');
const routes = require('../routes/routes');

connection.connect( (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("MYSQL Connected...");
    }
});

app.use(cors());
app.use(express.json({ extended: false }));
app.use("/api",routers);
// app.use(cookieParser());

app.listen(5001, () => {
    console.log("Server start at port 5001");
});