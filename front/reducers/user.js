// 초기 상태 정의
export const initialState = {
  isLoggingOut: false,
  isLoggingIn: false, // 로그인 하고 있냐?
  loginErrorReason: "",

  signedUp: false, // 회원가입 성공
  isSigningUp: false, // 회원가입 시도중
  signUpErrorReason: "", //회원가입 실패 사유

  me: null, // 내 정보
  followingList: [], // 팔로잉 리스트
  followerList: [], // 팔로워 리스트
  userInfo: null, // 남의 정보
  posts: [], // 내가 작성한 post의 수 ???? <-- 내가 임의 추가함
}

// 액션의 이름
// saga를 위해서 로그인 과정에 이렇게 3개로 만듬, 비동기 요청 보내는 애들은 REQUEST 붙여주기\
// 이 시리즈들은 서버쪽에 갔다오는 비동기 요청 --> saga를 거쳐야한다
// 로그인
export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST"
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS"
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE"

export const LOG_IN_REQUEST = "LOG_IN_REQUEST"
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS"
export const LOG_IN_FAILURE = "LOG_IN_FAILURE"

// 초기 유저 정보 가져오는 액션(로그인 되어 있는지)
export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST"
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS"
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE"

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST"
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS"
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE"

// 내 팔로우랑 팔로워 목록 불러오는 액션
export const LOAD_FOLLOW_REQUEST = "LOAD_FOLLOW_REQUEST"
export const LOAD_FOLLOW_SUCCESS = "LOAD_FOLLOW_SUCCESS"
export const LOAD_FOLLOW_FAILURE = "LOAD_FOLLOW_FAILURE"

// 팔로우
export const FOLLOW_USER_REQUEST = "FOLLOW_USER_REQUEST"
export const FOLLOW_USER_SUCCESS = "FOLLOW_USER_SUCCESS"
export const FOLLOW_USER_FAILURE = "FOLLOW_USER_FAILURE"

// 언팔로우
export const UNFOLLOW_USER_REQUEST = "UNFOLLOW_USER_REQUEST"
export const UNFOLLOW_USER_SUCCESS = "UNFOLLOW_USER_SUCCESS"
export const UNFOLLOW_USER_FAILURE = "UNFOLLOW_USER_FAILURE"

// 이상한사람 지우기
export const REMOVE_FOLLOWER_REQUEST = "REMOVE_FOLLOWER_REQUEST"
export const REMOVE_FOLLOWER_SUCCESS = "REMOVE_FOLLOWER_SUCCESS"
export const REMOVE_FOLLOWER_FAILURE = "REMOVE_FOLLOWER_FAILURE"

// 리듀서의 단점으로 인해, 추후 설명
export const ADD_POST_TO_ME = "ADD_POST_TO_ME"

// =====================================================================

export default (state = initialState, action) => {
  switch (action.type) {
    // --------------------------

    case LOG_IN_REQUEST: {
      return {
        ...state,
        isLoggingIn: true,
      }
    }

    case LOG_IN_SUCCESS: {
      return {
        ...state,

        isLoggingIn: false,
        me: action.data,
      }
    }

    case LOG_IN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        loginErrorReason: action.error,
      }
    }

    // --------------------------

    case LOG_OUT_REQUEST: {
      return {
        ...state,
        isLoggingOut: true,
      }
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        me: null,
        isLoggingOut: false,
      }
    }
    case LOG_OUT_FAILURE: {
      return {
        ...state,
        isLoggingOut: false,
      }
    }

    case SIGN_UP_REQUEST: {
      return {
        ...state,
        isSigningUp: true,
      }
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        isSigningUp: false,
      }
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        isSigningUp: false,
        signUpErrorReason: action.error,
      }
    }
    case LOAD_USER_REQUEST: {
      return {
        ...state,
      }
    }
    case LOAD_USER_SUCCESS: {
      if (action.me)
      // saga에서 내정본느 남의 정본지 구별해서 나인지 남정본지 구별시키기
        return {
          ...state,
          me: action.data,
        }
      else
        return {
          ...state,
          userInfo: action.data,
        }
    }

    case LOAD_USER_FAILURE: {
      return {
        ...state,
      }
    }

    default: {
      return {
        ...state,
      }
    }
  }
}
