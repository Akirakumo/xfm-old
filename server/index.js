const express = require('express');
const path = require('path');
const app = express();

const { dirPath } = require('./config')
const { isFileExisted, makeCover, readJSON, makeData, readZip, createJSON } = require('./fileHandle');


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
    res.send('服务启动成功')
})

app.get('/public/thumb/*', function (req, res) {
    res.sendFile( __dirname + "/" + req.url );
})

app.get('/login', (req, res) => {
    const { username, password, remember } = req.query
    res.send({
        username,
        password,
        remember
    })
})

// 获取文件夹目录数据
app.get('/getDir', (req, res) => {
    const { type, name } = req.query
    const target_name = name ? name : ''
    const dir_path = path.join( dirPath[type], target_name );
    const json_path = `${__dirname}/data/${type}.json`;

    (async () => { 
        
        try{

            const flag = await isFileExisted(json_path)

            if(flag){

                console.log('请求json目录' + json_path);

                const data = await readJSON(json_path)
                res.send(data)

            }else{

                console.log('请求文件夹目录' + dir_path);

                let list = await makeData(dir_path)

                for (let file of list) {

                    let zip = await readZip(file)

                    file.filesLen = zip.len;

                    await makeCover({
                        originFile: zip.img,
                        newPath: `./public/thumb/${file.id}.jpg`,
                        height: 200
                    })

                    file.cover = `http://192.168.31.190:8081/public/thumb/${file.id}.jpg`
                    
                }
                
                await createJSON(type,JSON.stringify(list))
                
                res.send(list)
            }

        } catch (err) {
            console.error(err);
        }

    })()
})


app.listen(8081, () => {
    console.log("服务器已启动，访问地址:http://localhost:8081 或 http://192.168.31.190:8081")
})