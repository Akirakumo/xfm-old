import { UPDATAUSERINFO } from '../constant'

const initState = 0; // 初始化状态值

export default function userReducer(preState = initState, action) {

    const { type, data } = action

    switch (type) {
        case UPDATAUSERINFO:
            return data
        default:
            return preState
    }
}