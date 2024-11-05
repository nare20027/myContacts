const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

/*
    no-cache : 브라우저에서 캐시를 사용하지 않고 서버에서 응답을 매번 다시 받음
    no-store : 서버의 응답을 캐시에 저장하지 않음
    must-revalidate : 캐시에 있는 정보를 사용하더라도 반드시 서버에서 재확인 
*/
const checkLogin = async (req, res, next) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

    const token = req.cookies.token;

    if(!token) { // 토큰이 없을 경우 로그인페이지로
        return res.redirect("/");
    }
    try {
        const decoded = jwt.verify(token, jwtSecret); // 토큰 해석 
        req.username = decoded.username; // 토큰의 사용자 이름을 요청하고 사용자 이름에 할당
        next();
    } catch(error) {
        return res.status(401).json({ message: "로그인이 필요합니다." });
    }
};

module.exports = checkLogin;