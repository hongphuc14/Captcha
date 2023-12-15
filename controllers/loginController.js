const request = require('request');

const login = (req, res) => {
    const secretKey = '6LfrwjEpAAAAAHoeo-UDbBgF7Std51Chwp_Vd5hZ';
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
            return res.status(500).json({ 
                success: false, 
                msg: 'Internal Server Error' 
            });
        }

        body = JSON.parse(body);

        if(!body.success || body.score < 0.4){
            return res.json({
                'success': false,
                'msg': 'You might be a robot, sorry!!!', 
                'score': body.score          
            });
        }

        return res.json({
            'success': true,
            'msg': 'Login successfully!!!', 
            'score': body.score
        });
    })
};

module.exports = { login }