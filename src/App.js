import React, { useState, useContext} from 'react'
import './APP.css'

import Login from './components/Login'
import Home from './components/Home'

const isLogin = localStorage.getItem('isLogin')
console.log('islogin',isLogin);

export default function APP () {
  return (
      <>
        {isLogin==='true'?<Home/>:<Login/>}     
      </>
  )
}