const express = require("express");
const mongoose = require('mongoose');
const { resolve } = require("path");

require('./utils')

const app = express();
const { dirPath } = require("./config");
const {
  isFileExisted,
  readJSON,
  initData,
  createJSON,
} = require("./handleFiles");

// 连接数据库
mongoose.connect('mongodb://localhost/storage');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('数据库连接成功'));

// 解决跨域
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PATCH, PUT, DELETE"
  );
  res.header("Allow", "GET, POST, PATCH, OPTIONS, PUT, DELETE");
  next();
});

app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.send("服务启动成功");
});

app.get("/public/thumb/comic/*", function (req, res) {
  console.log(req.url);
  res.sendFile(__dirname + '/' + req.url);
});

app.get("/login", (req, res) => {
  const { username, password, remember } = req.query;
  res.send({
    username,
    password,
    remember,
  });
});

// 获取文件夹目录数据
app.get("/getDirData", (req, res) => {

  const { type } = req.query;

  // const _dirPah = 

  const dir_path = resolve(dirPath[type]);

  const json_path = resolve(__dirname, "data", `${type}.json`);

  console.log('收到请求/getDirData'+type);

  (async () => {
    try {
      const flag = await isFileExisted(json_path);
      if (flag) {
        console.log("请求json目录" + json_path);
        const data = await readJSON(json_path);
        res.send(data);
      } else {
        console.log("请求文件夹目录" + dir_path);
        const data = await initData(dir_path, type);
        await createJSON(type,JSON.stringify(data))
        res.send(data);
      }
    } catch (err) {
      console.error(err);
    }
  })();
});


let server = app.listen(8081, "localhost", () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log("服务器已启动，访问地址:http://%s:%s", host, port);
});
