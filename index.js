const express = require('express')
const bodyParser = require('body-parser');
const got = require('got');
const app = express();
const port = 8000;

require('dotenv').config();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'public','index.html'));
});

// receives call from search form
// makes api call
app.post('/search',(req, res)=> {
    (async () => {
        try {
            console.log(req);
            const response = await got('https://api.waqi.info/feed/' + req.body.city + '/?token=' + process.env.API_KEY);

            console.log(response.body);
            var aqiData = JSON.parse(response.body);
            res.send(aqiData);
        } catch (error) {
            console.log(error.response.body);
        }
    })();
})

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
});