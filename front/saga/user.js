import {
  all,
  fork,
  call,
  takeLatest,
  takeEvery,
  delay,
  put,
} from "redux-saga/effects"
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from "../reducers/user"
import axios from "axios"



// API함수, watch 함수, watch할 때 뭐 할지 이렇게 하나의 요청에 3개의 함수의 패턴!!

function loginAPI(loginData) {
  // 1.5) 이부분이 서버에다가 요청을 보내는 부분
  return axios.post("/user/login", loginData, {
    withCredentials: true, // 이걸 적어줘야 프론트와 서버간에 쿠키를 주고받을 수 있게 됨!!
  })
}

function* login(action) {
  try {
    /* 
      2) LOG_IN 액션이 들어왔다면, login API로 요청을 보냄
      여기서 call인 이유가, 동기로 해야하기 때문에
      요청이 다 보내진 후에 응답을 받고 뒤에걸 실행해야 하니까
      __순서를 지켜서 실행해야한다 --> call!! __
    */

    const result = yield call(loginAPI, action.data) // async await같이 동기부분에 call로 해줘야 겠구만
    yield delay(1000) // 임시방편

    // 3-1) (put은 dispatch와 동일) 성공했다면
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data, // 여기에 이제 사용자 정보가 들어가 있겠지 axios에서 받아온 거니깐
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

function signUpAPI(signUpdata) {
  // 실제로 서버에 요청을 보내는 요청
  return axios.post("/user/", signUpdata)
}

// 이 패턴이 고정이네
function* signUp(action) {
  try {
    yield call(signUpAPI, action.data) // 2번째 인자에 넘겨줌

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

// --------------------------세번째 패턴 로그아웃----------------------------

function logOutAPI(logoutdata) {
  // 실제로 서버에 요청을 보내는 요청
  return axios.post(
    "/user/logout",
    {},
    {
      withCredentials: true, // 로그인, 로그아웃 쿠키관련에선 해줘야함
    },
  )
}

// 이 패턴이 고정이네
function* logOut(action) {
  try {
    yield call(logOutAPI)

    yield put({
      type: LOG_OUT_SUCCESS,
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LOG_OUT_FAILURE,
      error: e,
    })
  }
}

function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, logOut)
}

// --------------------------네번째 패턴 쿠키가 있다면 로드 유저 시키기!----------------------------

function loadUserAPI(userId) {
  // 실제로 서버에 요청을 보내는 요청
  return axios.get(userId ? `/user/${userId}`  : "/user", {
    withCredentials: true, // 내 세션쿠기를 서버쪽에 보내서 확인하는 거라거 이거 필요함
  })
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI,action.data)

    yield put({
      type: LOAD_USER_SUCCESS,
      data : result.data,
      me : !action.data // userId가 없으면!! 내 정보 불러오는 거니까 리듀서에서 구분하여 처리하게
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LOAD_USER_FAILURE,
      error: e,
    })
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser)
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchSignUp),
    fork(watchLogOut),
    fork(watchLoadUser),
  ])
}
// 여기처럼 fork를 붙이는 이유 : watchLogin, watchSignUp 얘네끼린 순서가 없음
// 이벤트리스너끼리 순서가 어딨냐
