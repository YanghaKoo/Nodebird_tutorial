import { all, call, delay, takeLatest, put, fork } from "redux-saga/effects"
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE
} from "../reducers/post"
import axios from "axios"

// API붙은 애들은 제너레이터 아님
function addPostAPI(addPostData) {
  // 실제로 서버에 요청을 보내는 요청
  return axios.post("/post", addPostData, {
    withCredentials: true, // withCredentials은 로그인한 사람만 할 수 있게 하는 걸 검증해야 하니까 쿠키 같이 보내줘야함
  })
}

// 이렇게 addPost에 action을 넣으면 ADD_POST_REQUEST에서 넘어오는 action.data 사용 가능
function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data)

    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: ADD_POST_FAILURE,
      error: e,
    })
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost)
}

// ----

function addCommentAPI() {
  // 실제로 서버에 요청을 보내는 요청
}

// 이렇게 addComment에 action을 넣으면 ADD_Comment_REQUEST에서 넘어오는 action.data 사용 가능
function* addComment(action) {
  try {
    console.log("asdasdasd")
    yield call(addCommentAPI)
    yield delay(1000)
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: { postId: action.data.postId },
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: e,
    })
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}


// ----

function loadMainPostsAPI() {
  // 실제로 서버에 요청을 보내는 요청
  return axios.get('/posts') // 로그인 안한사람도 메인 페이지 게시물 보니까 크리덴셜 없어도 됨
}


function* loadMainPosts() {
  try {    
    const result= yield call(loadMainPostsAPI)
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      data: result.data
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE,
      error: e,
    })
  }
}

function* watchLoadMainPosts() {
  yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPosts)
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment), fork(watchLoadMainPosts)])
}
