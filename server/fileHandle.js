const fs = require('fs/promises');
const sharp = require('sharp');
const admzip = require('adm-zip');
const { nanoid } = require('nanoid');

function isFileExisted (_path) {
    return new Promise( resolve => {
        fs.access(_path)
        .then(
            res => resolve(true)
        )
        .catch(
            err => resolve(false)
        )
    })
}

function readZip (_path) {
    let zip = new admzip(_path);
    let zipEntries = zip.getEntries();
    zipEntries.forEach(zipEntry => {
        if (zipEntry.isDirectory === false) {
            console.log("pop=>"+zipEntry.entryName.toString().split("/").pop())
            if((zipEntry.entryName.toString().split("/").pop() )==("info.json")){
                console.log("=>"+zip.readAsText("result/info.json"))
            }
        }
    });
}

function makeCover (params) {
    const { originFile, newPath, height } = params
    return new Promise( (resolve,reject) => {
        sharp(originFile)
        .resize(null,height)
        .toFile(newPath,(err,data) => {
            if(err) reject(err)
            resolve(data) // data为新pic的信息
        })
    })
}


function readJSON (jsonPath) {
    return new Promise ( (resolve,reject) => {
        fs.readFile(jsonPath)
        .then( data => {
            if (data[0] === 0xEF && data[1] === 0xBB && data[2] === 0xBF) {
                data = data.slice(3); // 去除特殊符号，就是这些符号让数据无法解析
            }
            data = data.toString('utf-8');// 指定编码方式
            resolve(data)
        })
        .catch(
            err => reject(err)
        )
    })
}

function readZip (params) {
    const { id, path, name } = params
    return new Promise ( (resolve,reject) =>{
        const zip = new admzip(`${path}/${name}`);
        // 获取所有zip中entry并遍历
        let zipFiles = zip.getEntries();
        let img = zip.readFile(zipFiles[0])
        resolve({len:zipFiles.length,img})
    } )
}


async function makeData (dirPath) {
    const list = await fs.readdir(dirPath)

    let data = [];

    for (let file of list) {

        let stats = await fs.stat(`${dirPath}/${file}`)
        data.push({
            id: nanoid(),
            path: dirPath,
            name: file,
            stats
        })
    }

    return Promise.resolve(data)
}

async function createJSON (name,str) {
    const _path = `${__dirname}/data/${name}.json`;
    await fs.open(_path,'w')
    await fs.writeFile(_path,str)
}

module.exports = {
    isFileExisted,
    readZip,
    readJSON,
    createJSON,
    makeCover,
    makeData,
}