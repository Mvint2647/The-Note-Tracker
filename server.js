const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 3000;
const fs = require("fs");
const app = express();
const apiRoutes = require('./routes/apiroutes');
const htmlRoutes = require('./routes/htmlroutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/',htmlRoutes)
app.use('/api',apiRoutes)
         app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });