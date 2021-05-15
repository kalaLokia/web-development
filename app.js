const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


const api_key = "3ef3d02dacc99da9f544e893d85fe8b5";
const api_endpoint = "https://api.openweathermap.org/data/2.5/weather";
const api_icon_endpoint = "https://openweathermap.org/img/wn/"; //_@2x.png


app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
});

app.post("/", function (request, response) {
    const cityName = request.body.cityName;

    url = api_endpoint + "?q=" + cityName + "&appid=" + api_key + "&units=metric";

    https.get(url, function (res) {
        console.log(res.statusCode);

        if (res.statusCode == 200) {
            res.on("data", function (data) {
                const weatherData = JSON.parse(data);
                const temperature = weatherData.main.temp;
                const weatherDescription = weatherData.weather[0].description;
                const img_url = api_icon_endpoint + weatherData.weather[0].icon + "@2x.png"

                response.write("<p> Description: " + weatherDescription + "</p>");
                response.write("<h1> Temperature: " + temperature + "</h1>");
                response.write("<img src='" + img_url + "' alt='No Image available'>");
                console.log(img_url);
                response.send();
            });
        }
        else {
            response.send("<h1>" + res.statusCode + "</h1>");
        }
    });

});




app.listen(3000, () => console.log("Sever started and running on port 3000"));