const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost/storage');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => console.log('数据库连接成功'));

module.exports = db;