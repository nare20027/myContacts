const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

/*
    res.cookie(name, value, option)
    Option 종류
    domain : 쿠키 유효 도메인 설정
    path : 쿠키 유효 경로 설정
    expires : 쿠키 만료 날짜 설정
    maxAge : 쿠키 최대 수명 밀리초 단위로 설정
    secure : 쿠키를 안전한 연결(HTTPS)에서만 전송되도록 설정
    httpOnly : HTTP 통신에서만 쿠키가 생성되도록 설정 
*/
app.get('/', (req, res) => {
    res.cookie("Kim", "1234", {httpOnly: true}); 
    res.send("쿠키 생성");
});

app.get('/cookie', (req, res) => {
    console.log(req.cookies);
});

app.get('/delete-cookie', (req, res) => {
    res.clearCookie("Kim");
    res.send("쿠키 삭제");
});

app.listen(5000, () => {
    console.log('서버 실행 중');
});