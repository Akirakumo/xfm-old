
let arr = [1,2,3,4]

function promiseFn (n) {
    return new Promise (resolve => {
        resolve(n)
    })
}

// arr.forEach( async i => {
//     console.log('forEach',i);
//     let n  = await promiseFn(i)
//     console.log(n)
// })

(async () => {
    for ( let i of arr ){
        console.log('for of', i);
        let n = await promiseFn(i)
        console.log(n);
    }
})()

