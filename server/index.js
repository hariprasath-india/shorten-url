require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");

const initializeApp = async () =>{
    require("./database");
    const port = process.env.PORT || 5000;
    // Middleware
    app.use(cors());
    app.use(express.json()); 

    require("./routes")(app);
    app.listen(port, () => {
        console.log("server has started on port",port);
    });
}

initializeApp()