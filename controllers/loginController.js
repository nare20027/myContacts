const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

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

//@desc Login user
//@route POST/
const loginUser = asyncHandler(async(req, res) => {
    const { username, password } = req.body;
    /*
    if(username === "admin" && password === "1234") {
        res.send('Login success');
    } else {
        res.send('Login failed');
    }*/

    const user = await User.findOne({ username });

    if(!user) { // 일치하는 사용자가 없을 때 오류 메세지 표시
        return res.status(401).json({ message: "일치하는 사용자가 없습니다." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message:"비밀번호가 일치하지 않습니다." });
    }

    // 사용자 ID 기반 JWT 생성
    const token = jwt.sign({ id: user._id }, jwtSecret);
    // 생성된 토큰을 쿠키에 저장
    res.cookie("token", token, { httpOnly: true });

    // 로그인에 성공하면 '/contacts'로 이동시킴
    res.redirect("/contacts");
});

//@desc Logout
//@route GET /logout
const logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
};

module.exports = { getRegister, registerUser, getLogin, loginUser, logout };