import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

// redux
import store from './redux/store'
import { Provider } from 'react-redux'

// useContext
// import { MyProvider } from './context'

import './index.less'

// redux
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

// useContext
// ReactDOM.render(
//   <MyProvider>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </MyProvider>,
//   document.getElementById('root')
// )
