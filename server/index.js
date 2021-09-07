const express = require('express');
const fs = require('fs');
const app = express();

const path = 'D:/Storage/COMIC/'

// 解决跨域
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method' )
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
    res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
    next();
});


app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    console.log('服务启动成功');
    res.send('启动成功,当前目录' + path)
})

// 获取文件夹目录
app.get('/getDir', (req, res) => {
    const { name } = req.query
    console.log('请求文件夹目录');
    res.send({
        state:fs.statSync(path + name),
        list:fs.readdirSync(path + name)
    })
})

// 读取文件信息
app.get('/getDir', (req, res) => {
    const { name } = req.query
    res.send(fs.readdirSync(path + name))
})

// 读取文件
app.get('/getFile', (req, res) => {
    let { path,name } = req.query;
    fs.readFile(path + name,(err,data)=>{
        if (!err) {
            res.send(data)
        } else {
            console.log(err);
            res.send(err)
        }
    })
})

app.listen(8081, () => {
    console.log("服务器已启动，访问地址:http://localhost:8081 或 http://192.168.31.190/:8081")
})