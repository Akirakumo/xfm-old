import axios from 'axios'

export const get = ( url, params ) => {
    return new Promise( (resolve,reject) => {
        axios.get(url, { params })
        .then( 
            res => {
                if (res.status === 200) resolve(res.data)
            }
        )
        .catch(
            err => reject(err)
        )
    })
}