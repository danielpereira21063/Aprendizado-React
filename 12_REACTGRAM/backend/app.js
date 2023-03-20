require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//solve cors
app.use(cors({credentials: true, origin: "http://localhost:3000"}));

//upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//DB connection
require("./config/db.js");

const routes = require("./routes/Router.js");
app.use(routes);

app.listen(port, ()=>{
    console.log(`Running on http://127.0.0.1:${port}`);
});
