const fs = require('fs/promises');
const sharp = require('sharp');
const admzip = require('adm-zip');
const { nanoid } = require('nanoid');

// 文件是否存在
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

// 读取JSON
function readJSON (_path) {
    return new Promise ( (resolve,reject) => {
        fs.readFile(_path)
        .then( data => {
            if (data[0] === 0xEF && data[1] === 0xBB && data[2] === 0xBF) data = data.slice(3) // 去除特殊符号
            resolve(data.toString('utf-8'))
        })
        .catch(
            err => reject(err)
        )
    })
}

// 写入JSON
async function createJSON ( name, str ) {
    const _path = `${__dirname}/data/${name}.json`;
    await fs.open( _path, 'w' )
    await fs.writeFile( _path, str )
}

// function readZip (_path) {
//     let zip = new admzip(_path);
//     let zipEntries = zip.getEntries();
//     zipEntries.forEach(zipEntry => {
//         if (zipEntry.isDirectory === false) {
//             console.log("pop=>"+zipEntry.entryName.toString().split("/").pop())
//             if((zipEntry.entryName.toString().split("/").pop() )==("info.json")){
//                 console.log("=>"+zip.readAsText("result/info.json"))
//             }
//         }
//     });
// }

// 读取zip文件信息
function readZip (_path) {
    const zip = new admzip(_path);
    
    const zipFiles = zip.getEntries();
    // 获取第一张图作为封面
    const cover = zip.readFile(zipFiles[0]);

    return Promise.resolve({
            len:zipFiles.length,
            cover
        })
}

// 初始化数据
async function initData (dirPath,type) {

    // 获取文件夹内文件名数组
    const list = await fs.readdir(dirPath)

    let data = [];

    // 生成通用信息
    for (let file of list) {
        // 文件路径
        const filePath = `${dirPath}/${file}`;
        // 获取文件信息
        const fileStats = await fs.stat(filePath)

        data.push({
            _id: nanoid(),
            dirPath: dirPath,
            fileName: file,
            filePath,
            fileType: (file.search(/\.zip$/g) > -1) ? 'zip':'dir',
            fileStats,
            filesLength: 0,
            author: [],
            publish: [],
            event: [],
            tags: [],
            cover: 'error',
        })
    }

    // 根据类型特殊处理
    switch(type){
        case 'comic':
            data = await handleComicData(data);
            break;
        case 'music':
            data = await handleMusicData(data);
            break;
        default:
            break;
    }

    return Promise.resolve(data)
}



async function handleComicData (data) {

    for(let item of data ) {
        const { _id, fileName, filePath } = item;

        // 读取zip内容
        const zip = new admzip(filePath)

        const zipFiles = zip.getEntries();

        // 获取第一张图作为封面
        const cover = zip.readFile(zipFiles[0]);

        item.filesLength = zipFiles.length;
        item.event = fileName.match(/^\(\S*/)
        item.cover = `http://127.0.0.1:8081/public/thumb/comic/${_id}.jpg`
        
        // 添加封面
        sharp(cover)
        .resize(null,200)
        .toFile(
            `${__dirname}/public/thumb/comic/${_id}.jpg`,
            err => { if(err) console.log(err) }
        )
        
    }

    return Promise.resolve(data);
}

async function handleMusicData (data) {
    for(let item of data ) {
        const { id, name, path } = item;
        item.release = name.match(/^\[{1}[0-9]{6}\]{1}/) || [];
        item.quality = name.match(/(320K|m4a|FLAC){1}/g) || ['Flac'];
        // 处理封面
        await makeCover({
            originFile: `${path}/${name}/cover.jpg` || `${path}/${name}/cover.png`,
            newPath: `./public/images/thumb/${id}.jpg`,
            height: 100
        }).then(
            res => item.cover = `/public/images/thumb/${id}.jpg`
        ).catch(
            err => console.log(id + ' make cover error')
        )
        
    }
    
    return Promise.resolve(data);
}

// 生成封面
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








module.exports = {
    isFileExisted,
    readZip,
    readJSON,
    createJSON,
    makeCover,
    initData,
}