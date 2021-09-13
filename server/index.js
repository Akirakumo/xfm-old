const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const path_type = {
    comic: 'D:/Storage/COMIC/COMIC',
    music: 'D:/Music/MUSIC'
}

function doReadFiles(path){
    return new Promise((resolve,reject)=>{
        fs.readFile(path,(err,data)=>{
            if(err) reject(err)
            resolve(data)
        })
    })
}

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
})

app.get('/login', (req, res) => {
    const { username, password, remember } = req.query
    res.send({
        login_state: 200,
        username,
        password,
        remember
    })
})

// 获取文件夹目录
app.get('/getDir', (req, res) => {
    const { type,name } = req.query

    const path_name = name ? name : ''

    console.log(type,name);

    const dir_path = path.join(path_type[type],path_name)

    console.log('请求文件夹目录' + dir_path);

    const list = fs.readdirSync(dir_path);
    
    res.send(list)
})

// 读取文件信息
app.get('/getFiles', (req, res) => {
    const { name } = req.query
    res.send()
})

// 读取文件
app.get('/getFile', (req, res) => {
    const { path,name } = req.query;

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
    console.log("服务器已启动，访问地址:http://localhost:8081 或 http://192.168.31.190:8081")
})