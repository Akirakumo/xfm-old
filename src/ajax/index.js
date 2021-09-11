import axios from 'axios'

export const login = params => {
    return axios.get('http://192.168.31.190:8081/login', {
        params
    })
}

export const getDir = params => {
    return axios.get('http://192.168.31.190:8081/getDir', {
        params
      })
}