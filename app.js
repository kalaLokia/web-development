const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// User (left bottom) -> Settings -> Extras -> Api keys
const api_key = "dfd58d13a9381d7ce6691013eedd0baf-us1";
// the end 3 lines of api keys (us1 - us4). 
const api_server = api_key.substring(api_key.length - 3);
// Audience -> Manage Audience (right top) -> Settings = At the end you can find yours
const api_listid = "1f3da9d4e4";


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://" + api_server + ".api.mailchimp.com/3.0/lists/" + api_listid;
    const options = {
        method: "POST",
        auth: "spectre:" + api_key,
    }

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(response.statusCode);
        })
    });

    request.write(jsonData);
    request.end();
});


app.post("/failure", function (req, res) {
    res.redirect("/");
});

// process.env.PORT will excecute Heroku server else on port 3000 on local machine
app.listen(process.env.PORT || 3000, function () {
    console.log("Server started running on port 3000");
})
