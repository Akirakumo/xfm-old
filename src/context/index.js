import React, { createContext,useReducer } from 'react'

// 初始化公共状态
const initState = {
    isLogin: false
}

// action的type常量
export const UPDATA_USERNAME = 'UPDATA_USERNAME'

// reducer
const reducer = (state,action) => {
    
    const {type,data} = action

    switch(type){
        case UPDATA_USERNAME:
            return {
                ...data,
                userName: data.userName
            }
        default:
            return state
    }
}

// 创建一个共享状态
export const AppContext = createContext({})

// 创建一个组件使内部子组件都能使用共享的状态
export const MyProvider = props => {
    
    // action
    const [state,dispatch] = useReducer(reducer,initState)

    return (
        <AppContext.Provider value={{state,dispatch}}>
            {props.children}
        </AppContext.Provider>
    )
}