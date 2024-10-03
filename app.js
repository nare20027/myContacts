const express = require('express');
const dbConnect = require('./config/dbConnect') // mongoose 연결 

const app = express(); // express 실행으로 app 서버 생성
const port = 3000;

dbConnect();

app.route('/').get((req, res) => {
    res.status(200);
    res.send('Hello Node!');

});

/* 
    app.use 미들웨어 등록 app.use([경로], 미들웨어)
    경로를 지정하면 그 경로를 요청할 때만 해당 미들웨어를 사용하겠다는 뜻이다.
*/
app.use(express.json());
/*
    express.urlencoded :> 쿼리스트링 해석 시 어떤 모듈을 사용할 지 지정
    queryString :> 사용자가 서버로 자료를 보낼 때 url에 파라미터 형태로 포함시켜 보내는 문자열 
    extended 옵션을 통해 쿼리스트링 해석 시 어떤 모듈을 사용할 지 지정할 수 있다.
    urlencoded({extended:false}) :> queryString모듈(중첩객체 표현 불가)을 사용해 쿼리스트링을 해석
    urlencoded({extended:true}) :> qs모듈(중첩객체 표현 가능 {name:"", phone:"", email""})을 사용해 쿼리스트링 해석 
    */
app.use(express.urlencoded({ extended: true}));
app.use('/contacts', require('./routes/contactsRoutes'));


app.listen(port, () => {
    console.log(`${port}번 포트에서 서버 실행 중`);
});