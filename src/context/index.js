import React, { createContext,useReducer } from 'react'
import initState from './state'
import reducer from './reducer'

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