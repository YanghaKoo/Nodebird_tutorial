import { combineReducers } from 'redux'
import user from './user'
import post from './post'
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:3065/api"  // 이건 전역적으로 적용이 됨!!!!!

const rootReducer = combineReducers({
  user,
  post
})

export default rootReducer