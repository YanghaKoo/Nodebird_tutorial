const dummyUser = {
  nickname: "제로초",
  Post: [],
  Followings: [],
  Followers: [],
  isLoading: false,
}

// 초기 상태 정의
export const initialState = {
  isLoggedIn: false,
  user: null,
  signUpData: {},
}

// 액션의 이름
// saga를 위해서 로그인 과정에 이렇게 3개로 만듬, 비동기 요청 보내는 애들은 REQUEST 붙여주기\
// 이 시리즈들은 서버쪽에 갔다오는 비동기 요청 --> saga를 거쳐야한다
export const LOG_IN_REQUEST = "LOG_IN_REQUEST"
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS"
export const LOG_IN_FAILURE = "LOG_IN_FAILURE"

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST"
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS"
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE"

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST"
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS"
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE"

// 실제 액션
export const loginAction = {
  type: LOG_IN_REQUEST,
}

export const logoutAction = {
  type: LOG_OUT_REQUEST, // data는 필요 없겠지
}

// ****중요!!! 회원가입의 경우에는 들어오는 동적인 데이터기 때문에 미리 하드코딩 할 수 없음 ==> 함수로 코딩
export const signupAction = data => {
  return {
    type: SIGN_UP_REQUEST,
    data: data,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST: {
      return {
        ...state,
        isLoggedIn: true,
        user: dummyUser,
        isLoading: true,
      }
    }

    case LOG_IN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      }
    }

    case LOG_OUT: {
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      }
    }

    case SIGN_UP: {
      return {
        ...state,
        signUpData: action.data,
      }
    }

    default: {
      return {
        ...state,
      }
    }
  }
}

export default reducer
