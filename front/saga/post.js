import { all, call, delay, takeLatest, put, fork } from "redux-saga/effects"
import {
  ADD_POSTS_REQUEST,
  ADD_POSTS_SUCCESS,
  ADD_POSTS_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from "../reducers/post"

function* addPostAPI() {
  // 실제로 서버에 요청을 보내는 요청
}

// 이렇게 addPost에 action을 넣으면 ADD_POST_REQUEST에서 넘어오는 action.data 사용 가능
function* addPost(action) {
  try {
    yield call(addPostAPI)
    yield delay(1000)
    yield put({
      type: ADD_POSTS_SUCCESS,
      data: action.data,
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: ADD_POSTS_FAILURE,
      error: e,
    })
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POSTS_REQUEST, addPost)
}

// ----

function* addCommentAPI() {
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
      data: {postId : action.data.postId},
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

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)])
}
