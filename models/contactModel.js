const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema( // 스키마 : 애플리케이션에서 사용할 자료의 형태를 지정
    {
        name : {
            type : String, 
            required : true, // 필수속성여부
        },
        email : {
            type : String,
        },
        phone : {
            type : String,
            required : [true, '전화번호는 꼭 기입해 주세요.'], // 필수속성 오류메세지도 함께 지정
        },
    },
    {
        timestamps : true, // DB에 연락처 자료를 추가하거나 수정한 시간이 자동으로 기록된다. 
    }
);

// 스키마 --> 모델
const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;

//--> module.exports = mongoose.model('Contact', contactSchema); 