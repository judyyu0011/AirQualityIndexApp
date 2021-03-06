const express = require('express')
const bodyParser = require('body-parser');
const got = require('got');
const app = express();
require('dotenv').config();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'public','index.html'));
});

// handles post request from frontend, makes api call
// for default cities and search
app.post('/',(req, res)=> {
    (async () => {
        try {
            const response = await got('https://api.waqi.info/feed/' + req.body.city + '/?token=' + process.env.API_KEY);
            var aqiData = JSON.parse(response.body);

            // send data back
            res.send(aqiData);
        } catch (error) {
            console.log(error.response.body);
        }
    })();
})

// makes api call
// for current location
app.post('/curr-loc',(req, res)=> {
    (async () => {
        try {
            const response = await got('https://api.waqi.info/feed/geo:' + req.body.lat + ';' + req.body.lng + '/?token=' + process.env.API_KEY);
            var aqiData = JSON.parse(response.body);

            // send data back
            res.send(aqiData);
        } catch (error) {
            console.log(error.response.body);
        }
    })();
})

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}!`)
});