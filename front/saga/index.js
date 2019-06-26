import { all, call } from "redux-saga/effects"      // 리듀서처럼 루트에다가 합쳐준다. all과 call로 rootsaga에서 이어준다는 것 기억해라
import user from "./user"
import post from "./post"

export default function* rootSaga() {
  yield all([call(user), call(post)])
}


/*
  폴더구조 자체가 리듀서와 유사하네, index에서 user와 post를 합쳐줌


*/