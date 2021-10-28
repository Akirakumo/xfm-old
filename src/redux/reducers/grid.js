import { UPDATAGUTTER, UPDATAVGUTTER, UPDATACOLUMN } from '../constant'

// 初始化状态值
const initState = {
    gutter: 0,
    vgutter: 0,
    column: 6
}

export default function gridReducer(preState = initState, action) {

    const { type, data } = action

    switch (type) {
        case UPDATAGUTTER:
            return Object.assign({}, preState, { gutter: data })
        case UPDATAVGUTTER:
            return Object.assign({}, preState, { vgutter: data })
        case UPDATACOLUMN:
            return Object.assign({}, preState, { column: data })
        default:
            return preState
    }
}