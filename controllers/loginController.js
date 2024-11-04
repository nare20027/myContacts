const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

//@desc Register page
//@route GET /regiter
const getRegister = (req, res) => {
    res.render("register");
};
//@desc Register user
//@route POST /register
const registerUser = asyncHandler(async(req, res) => {
    // 폼에서 넘겨받은 내용 추출
    const {username, password, password2} = req.body;  
    if(password === password2) {
        //bcryt로 비밀번호 암호화
        const hashedPassword = await bcrypt.hash(password, 10); 
        // 사용자 이름과 암호화된 비밀번호를 사용하여 새로운 사용자 생성 
        const user = await User.create({username, password : hashedPassword});
        // 성공 메세지 출력
        res.status(201).json({message: "Rgister suceesful", user});
    } else {
        res.send("Register Failed");
    }
});

//@desc getLogin page
//@route GET/
const getLogin = (req, res) => {
    res.render("home");
};

const loginUser = asyncHandler(async(req, res) => {
    const { username, password } = req.body;
    if(username === "admin" && password === "1234") {
        res.send('Login success');
    } else {
        res.send('Login failed');
    }
});

module.exports = { getRegister, registerUser, getLogin, loginUser };