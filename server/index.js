const express = require('express');
const fs = require('fs');
const { resolve } = require('path');
const path = require('path');
const app = express();
const { isFileExisted } = require('./readFile')

const path_type = {
    comic: 'D:/Storage/COMIC/COMIC',
    music: 'D:/Music/MUSIC'
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

    const dir_path = path.join(path_type[type],path_name)
    const json_path = './data/'+ type + '.json'

    console.log('请求文件夹目录' + dir_path);
    console.log('请求json目录' + json_path);

    (async (json_path,dir_path) => { 
        try{
            const flag = await isFileExisted(json_path) 
            if(flag){
                fs.readFile(json_path,(err,data) => {
                    if (err) console.log(err.message)
                    if (data[0] === 0xEF && data[1] === 0xBB && data[2] === 0xBF) {
                        //去除特殊符号，就是这些符号让数据无法解析
                        data = data.slice(3);
                    }
                    data = data.toString('utf-8');//指定编码方式
                    res.send(data)
                })
            }else{
                let dir_list = fs.readdirSync(dir_path);
                let files_list = dir_list.map( file => {
                    let files = fs.readdirSync(path.join(dir_path,file))
                    return {
                        name: file,
                        files
                    }
                })
                fs.open(json_path,'w',(err,fd)=>{
                    if (err) throw err
                    let str = JSON.stringify(files_list)
                    fs.write(fd,str,(err,data) => {
                        if (err) throw err
                        res.send(str)
                    })
                })
            }
        } catch (e) {
            console.log(e);
        }
    })(json_path,dir_path)
})

// 读取文件
app.get('/getFile', (req, res) => {
    const { path,name } = req.query;
})

app.listen(8081, () => {
    console.log("服务器已启动，访问地址:http://localhost:8081 或 http://192.168.31.190:8081")
})