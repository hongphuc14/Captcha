const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const secretKey = '6LfrwjEpAAAAAHoeo-UDbBgF7Std51Chwp_Vd5hZ';
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/verify', (req, res) => {
    if(!req.body.captcha){
        return res.json({
            'success': false,
            'msg': 'Captcha token is undefined'
        });
    }
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}`;
    request(verifyUrl, (err, response, body) =>{
        if(err){
            console.log(err);
        }
        body = JSON.parse(body);
        if(!body.success || body.score < 0.4){
            return res.json({
                'success': false,
                'msg': 'You might be a robot, sorry!!', 'score': body.score          
            });
        }
        return res.json({
            'success': true,
            'msg': 'Login successfully!!!', 'score': body.score
        });
    })
})

app.listen(3000, () => {
    console.log('App is running');
})
