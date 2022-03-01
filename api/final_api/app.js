const fetch = require('node-fetch')
var express = require('express');
const sgMail = require('@sendgrid/mail')
const dotenv = require('dotenv')
// const cors = require('cors')
dotenv.config()
var app = express();
const textract = require('textract');
var bodyParser = require('body-parser');
app.set('port', process.env.PORT || 6000)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/extract', (req, res) => {
    const data = req.body;
    console.log("running api")
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
                res.send(resData)
            }
            catch (err) {
                res.send({ error: err.message })
            }

        }
    })

})
app.post('/sendMail', (req, res, next) => {
    const data = req.body
    console.log(process.env.SENDGRID_API_KEY)
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: data.mail,
        from: 'deepbluerpa@gmail.com',
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
        .send(msg)
        .then(() => {
            res.send('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })

})

app.listen(app.get('port'), () => { console.log("Connected") })

