import { combineReducers } from 'redux'
import user from './user'
import grid from './grid'

export default combineReducers({
    user,
    grid
})