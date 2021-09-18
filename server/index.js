const express = require("express");
const app = express();
const { resolve } = require("path");
const { dirPath } = require("./config");
const {
  isFileExisted,
  makeCover,
  readJSON,
  makeData,
  readZip,
  createJSON,
} = require("./fileHandle");

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

app.get("/public/thumb/*", function (req, res) {
  console.log(req.url);
  res.sendFile(__dirname + "/" + req.url);
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
app.get("/getDir", (req, res) => {
  const { type, name } = req.query;
  const target_name = name ? name : "";
  const dir_path = resolve(dirPath[type], target_name);
  const json_path = resolve(__dirname, "data", `${type}.json`);
  (async () => {
    try {
      const flag = await isFileExisted(json_path);

      if (flag) {
        console.log("请求json目录" + json_path);

        const data = await readJSON(json_path);

        res.send(data);
      } else {
        console.log("请求文件夹目录" + dir_path);

        let list = await makeData(dir_path);

        for (let file of list) {
          const { id, name } = file;

          // let zip = await readZip(file)

          // file.filesLength = zip.len;

          // await makeCover({
          //     originFile: zip.img,
          //     newPath: `/public/thumb/${id}.jpg`,
          //     height: 200
          // })

          // file.cover = `/public/thumb/${id}.jpg`

          // file.event = name.match(/^\(\S*/)?name.match(/^\(\S*/)[0].slice(1,-1):'';
        }

        console.log(list);

        // await createJSON(type,JSON.stringify(list))

        res.send(list);
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
