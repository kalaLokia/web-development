const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");


const app = express();

// Values can be pushed to constant arrays also,                -> items.push("hey there")
// but you can't assign any new array to that variable again    -> items = ["blahh"]
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.use(bodyParser.urlencoded({ 'extended': true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');


app.get("/", function (req, res) {
    day = date.getDate();
    res.render('index', { listTitle: day, newListItems: items });
});


app.get("/work", function (req, res) {
    res.render('index', { listTitle: "Work", newListItems: workItems });
});

app.get("/about", function (req, res) {
    res.render('about');
});

app.post("/", function (req, res) {
    let item = req.body.newItem;
    console.log(req.body);

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item);
        res.redirect("/");
    }
});




app.listen(3000, function () {
    console.log("Server is up and running on port 3000");
});