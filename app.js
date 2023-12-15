const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const loginRoute = require('./routes/loginRoute');

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/login', loginRoute);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})
