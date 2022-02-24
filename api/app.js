const fetch = require('node-fetch')
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
    textract.fromUrl(data.url, async (err, text) => {
        if (err) {
            res.status(404).send(err)
        }
        else {
            console.log(text)
            try {
                const response = await fetch('http://127.0.0.1:5000/extractData', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        data: text
                    })
                })
                const resData = await response.json()
                res.send({ res: resData })
            }
            catch (err) {
                res.send({ error: err.message })
            }

        }
    })

})

app.listen(port)

