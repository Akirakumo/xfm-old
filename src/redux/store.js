import { createStore, applyMiddleware } from 'redux'
// 异步action中间件
import thunk from 'redux-thunk'
// redux开发工具
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers'

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))