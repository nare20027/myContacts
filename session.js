const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();

const app = express();

/*
  세션 등록 주요 옵션
  name : 세션 식별자를 지정하는 쿠키이름 default 값은 connect.sid
  secret : 쿠키 변조를 막기 위해 사용하는 비밀키
  store : 세션 데이터 저장 위치 지정 --> 메모리에 저장하는 것이 기본이지만 conect-mongo를 사용하면 몽고db에 저장 가능
  cookie : 세션 쿠키의 유효기간이나 http 연결에서만 사용하도롥 지정 가능
  resave : 세션에 변경사항이 없을 때 세션을 저장할 것인지 지정, false 지정 시 변경사항이 있을 때만 세션 재저장
  saveUninitialized : 초기화되지 않은 세션을 저장할지 지정, 일반적으로 true를 사용해 초기화되지 않은 세션도 저장
*/
app.use(
  session({
    secret: "secret code",            // 세션 비밀키
    resave: false,                    // 변경할 내용이 없으면 다시 저장하지 않음
    saveUninitialized: true,          // 초기화되지 않은 세션 저장
    store: MongoStore.create({ mongoUrl: process.env.DB_CONNECT }),   // MongoDB에 세션 저장
    cookie: { MaxAge: 60 * 60 * 24 * 1000 },  // 쿠키 유효기간을 24시간으로 지정(밀리초 단위)
  })
);

app.get("/", (req, res) => {
  if (req.session.count) {  // 세션에 count가 있다면
    req.session.count++;    // count값을 1증가 시키고
    // 세션에 저장된 count 값을 가져와 출력한다.
    res.send(`${req.session.count}번째 방문입니다.`);
  } else {  // 세션에 count값이 없다면
    req.session.count = 1;  // count를 추가하고
    res.send("첫 번째 방문입니다."); // 첫 방문임을 알려준다. 
  }
});

// 세션정보를 활용해 경로로 접속했을 때 세션 ID 정보 표시 
app.get("/session", (req, res) => { 
  res.send(`session ID : ${req.sessionID}`);
});

// 세션 정보 삭제
app.get("/delete-session", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.clearCookie("connect.sid");
      res.send("세션 삭제");
    }
  });
});

app.listen(5000, () => {
  console.log("서버 실행 중");
});
