//시용자 정보

const mongoose = require("mongoose");

// Mongoose 스키마 가져오기
const Schema = mongoose.Schema;

// 사용자 스키마 생성
const UserSchema = new Schema({
    username: {
        type: String,
        required: true, // 필수 속성 지정
        unique: true, // 중복 불허
    },
    password: {
        type: String,
        required: true, // 필수 속성 지정
    },
});

// UserModel 내보내기
module.exports = mongoose.model("User", UserSchema);