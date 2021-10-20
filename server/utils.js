// 忽略以.开头的文件
Array.prototype.filesFilter = function (reg) {
    return this.filter( item => { 
        if ( typeof item === 'string' && item.search(reg) < 0){
            return item
        }
    })
}