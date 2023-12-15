document.querySelector('.my-login-validation').addEventListener('submit', runVerify);

function runVerify(e) {
    e.preventDefault();
    runCaptcha();
}
        
function runCaptcha() {
    grecaptcha.execute('6LfrwjEpAAAAAFbKZuMDYs3fnvKk_20gW2nQoUvt', {action: 'login'}).then(function(token) {
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const captcha = token;
    
        if (!email) {
            alert('Email không được để trống');
            return;
        }
        else if (email.indexOf('@') == -1 || (email.indexOf('@') == email.length - 1)) {
            alert('Email không hợp lệ');
            return;
        }
        else if (!password) {
            alert('Mật khẩu không được để trống');
            return;
        }
        
        sendData(email, password, captcha);
    });
}

function sendData(email, password, captcha) {
    const info = JSON.stringify({
        email: email,
        password: password,
        captcha: captcha
    });
    
    fetch('/login', {
        method:'POST',
        headers:{
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: info
    }).then((res) => res.json()).then((data) =>{
        if(data.success){
            alert('Đăng nhập thành công! Score: ' + data.score);
        }
        else{
            alert('Đăng nhập thất bại! ' + data.msg);
        }
    });
}