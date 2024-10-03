const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async () => { // 비동기처리
    try {
        const connect = await mongoose.connect(process.env.DB_CONNECT);
        console.log('DB connected');
    } catch (err) {
        console.log(err);
    }
};
module.exports = dbConnect;