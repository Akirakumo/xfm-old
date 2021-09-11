import React,{ useContext } from 'react'
import { AppContext,UPDATA_USERNAME } from '../../context'

console.log(AppContext);
export default function Setting () {
    const { state:{userName},dispatch } = useContext(AppContext);
    return (
        <>
            <h1>欢迎{ userName }</h1>
            <button onClick={()=>dispatch({type:UPDATA_USERNAME,data:{userName:'xmy'}})}>更改用户</button>
        </>
    )
}