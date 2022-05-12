require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require('./config/logger');
const httpLogger = require('./config/httpLogger');

const port = process.env.PORT || 5000
require("./config/database");

//config expressJS
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use(logErrors);
app.use(errorHandler);
app.use(httpLogger);

function logErrors (err, req, res, next) {
    logger.error(err.message)
  next(err)
}
function errorHandler (err, req, res, next) {
    logger.error("Error Occured",err.message)
    next(err)
}
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
     next();
});

app.get('/', (req, res) => {
    // res.sendFile(path.resolve('../', 'client', 'build', 'index.html'))
    res.redirect(process.env.BASE_URL)
})

require("./routes")(app);

app.listen(port, () => {
    console.log("server has started on port",port);
    logger.info(`server has started on port ${port}`)
});