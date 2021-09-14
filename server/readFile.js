const fs = require('fs');

exports.doReadFiles =  function (path){
    return new Promise((resolve,reject)=>{
        fs.readFile(path,(err,data)=>{
            if(err) reject(err)
            resolve(data)
        })
    })
}

exports.isFileExisted = function (path){
    return new Promise((resolve,reject)=>{
        fs.access(path,err=>{
            if(err) resolve(false)
            resolve(true)
        })
    })
}