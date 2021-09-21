const path = require("path");
const database = require("./db/db")
const express = require("express");
const PORT = process.env.PORT || 3000;
const fs = require("fs");
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/notes.html"));
})


app.route("/api/notes")
   
    .get(function (req, res) {
        res.json(database);
    })
    .post(function (req, res) {
        
        
        let jsonFilePath = path.join(__dirname, "/db/db.json");
        let newInstance = req.body;
        let largernumId = 99;
       
       
       
        for (let i = 0; i < database.length; i++) {
            let individualNote = database[i];

            if (individualNote.id > highestId) {
                
                largernumId = individualNote.id;
            }
        }
        newInstance.id = largernumId + 1;
        database.push(newInstance)

        fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {

            if (err) {
                return console.log(err);
            }
            console.log("Success! Note Saved"); });
       
                res.json(newInstance);
    });


         app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });