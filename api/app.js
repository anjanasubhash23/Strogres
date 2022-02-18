var express = require('express');
var app = express();
const textract = require('textract');
var bodyParser = require('body-parser');
let port = process.env.PORT || 8081
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/extracttext', (req, res, next) => {
    const data = req.body;
    console.log(data.url)
    textract.fromUrl(data.url, (err, text) => {
        if (err) {
            res.status(404).send(err)
        }
        else {
            const data = JSON.stringify({
                'data': text
            })
            res.send(data)

        }
    })

})

app.listen(port)

