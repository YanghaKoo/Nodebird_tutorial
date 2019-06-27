import { all, fork, call, takeLatest, takeEvery, delay, put } from "redux-saga/effects"
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from "../reducers/user"
// import axios from 'axios'

// API함수, watch 함수, watch할 때 뭐 할지 이렇게 하나의 요청에 3개의 함수의 패턴!!

function* loginAPI() {
  // 1.5) 이부분이 서버에다가 요청을 보내는 부분
}

function* login() {
  try {
    /* 
      2) LOG_IN 액션이 들어왔다면, login API로 요청을 보냄
      여기서 call인 이유가, 동기로 해야하기 때문에
      요청이 다 보내진 후에 응답을 받고 뒤에걸 실행해야 하니까
      __순서를 지켜서 실행해야한다 --> call!! __
    */

    yield call(loginAPI) // async await같이 동기부분에 call로 해줘야 겠구만
    yield delay(1000) // 임시방편

    // 3-1) (put은 dispatch와 동일) 성공했다면
    yield put({
      type: LOG_IN_SUCCESS,
    })
  } catch (e) {
    // 3-2) 실패한다면 여기로
    console.error(e)
    yield put({
      type: LOG_IN_FAILURE,
    })
  }
}

// 로그인 시, saga가 테이크 하게
function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login)
}

// --------------------------두번째 패턴 signUp----------------------------

function* signUpAPI() {
  // 실제로 서버에 요청을 보내는 요청
}

// 이 패턴이 고정이네
function* signUp() {
  try {
    yield call(signUpAPI)
    yield delay(1000)

    yield put({
      type: SIGN_UP_SUCCESS,
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: SIGN_UP_FAILURE,
      error: e,
    })
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp)
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchSignUp)])
}
// 여기처럼 fork를 붙이는 이유 : watchLogin, watchSignUp 얘네끼린 순서가 없음
// 이벤트리스너끼리 순서가 어딨냐
