const express = require('express')
const app = express()
const server = require('http').Server(app)
var io = require('socket.io')(server, { cors: true })

const { openSysInfo, closeSysInfo } = require('./sysInfo');

const os = require('os');
const db = require('./db')
const { resolve } = require('path')
const { dirPath } = require('./config')
const {
  isFileExisted,
  readJSON,
  initData,
  createJSON,
} = require('./handleFiles')





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
})

// 设置静态资源路径
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.send("服务启动成功");
});

// 登录
app.get("/login", (req, res) => {
  const { username, password, remember } = req.query;
  res.send({
    username,
    password,
    remember,
  });
});

// 获取目录
app.get('/views', (req, res) => {
  res.send([
    { type: 'comic', name: 'COMIC', url: 'd:/Storage/COMICDB/' },
    { type: 'music', name: 'MUSIC', url: 'd:/Music/ALBUM/' }
  ]);
})

// 获取图片
app.get("/public/thumb/comic/*", function (req, res) {
  console.log(req.url);
  res.sendFile(__dirname + '/' + req.url);
});

// 获取系统信息
app.get("/sysInfo", (req, res) => {

  // console.log('CPUS： ' + os.cpus());

  // console.log('获取计算机名称： ' + os.hostname());

  // console.log('获取操作系统类型： ' + os.type());

  // console.log('获取操作系统平台： ' + os.platform());

  // console.log('获取CPU架构： ' + os.arch());

  // console.log('获取操作系统版本号： ' + os.release());

  // console.log('获取系统当前运行的时间： ' + os.uptime())

  // console.log('系统总内存量： ' + (os.totalmem() / 1024 / 1024 / 1024).toFixed(1) + 'G')

  // console.log('空闲内存：' + (os.freemem() / 1024 / 1024 / 1024).toFixed(1) + 'G');

  res.send({
    hostname: os.hostname(),
    cpus: os.cpus(),
    arch: os.arch(),
    os: os.platform(),
    totalmem: (os.totalmem() / 1024 / 1024 / 1024).toFixed(1),
    freemem: (os.freemem() / 1024 / 1024 / 1024).toFixed(1),
    network: os.networkInterfaces()
  });
});

// 获取文件夹目录数据
app.get("/getDirData", (req, res) => {

  const { type } = req.query;

  const dir_path = resolve(dirPath[type]);

  const json_path = resolve(__dirname, "data", `${type}.json`);

  console.log('收到请求/getDirData' + type);

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
        await createJSON(type, JSON.stringify(data))
        res.send(data);
      }
    } catch (err) {
      console.error(err);
    }
  })();
});






// socket.io
io.on('connection', socket => {

  console.log('a user connected');
  socket.emit("connected", "连接成功")
  openSysInfo(socket)

  socket.on('disconnect', data => {
    console.log(data)
    socket.emit("unConnection", '断开连接')
    closeSysInfo()
  });

});




server.listen(8081, "localhost", () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log("服务器已启动，访问地址:http://%s:%s", host, port);
});