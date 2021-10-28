const redis = require('redis');
const { redisIP } = require('./config')

const rds = redis.createClient(6379, redisIP)

rds.on('error', err => {

    console.log('连接redis失败')

    rds.end(true)
    rds.quit()
    // 重新连接
    rds = redis.createClient(6379, redisIP)
})


module.exports = rds
