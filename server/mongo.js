const mongoose = require('mongoose');
const { mongoIP } = require('./config')
// 连接数据库
mongoose.connect(mongoIP);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => console.log('数据库连接成功'));

module.exports = db;