const dummyComment = {
  id : 1,
  User : {
    id : 1,
    nickname : "ㅁㄴㅇ"
  },
  createdAt : new Date(),
  content : "더미"
  }


  export const initialState = {
    mainPosts: [{
      id: 1,
      User: {
        id: 1,
        nickname: '제로초',
      },
      content: '첫 번째 게시글',
      img: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
      Comments: [],
    }], // 화면에 보일 포스트들
    imagePaths: [], // 미리보기 이미지 경로
    addPostErrorReason: '', // 포스트 업로드 실패 사유
    isAddingPost: false, // 포스트 업로드 중
    postAdded: false, // 포스트 업로드 성공
    isAddingComment: false,
    addCommentErrorReason: '',
    commentAdded: false,
  };

// 메인포스트 로딩
export const LOAD_MAIN_POST_REQUEST = "LOAD_MAIN_POST_REQUEST"
export const LOAD_MAIN_POST_SUCCESS = "LOAD_MAIN_POST_SUCCESS"
export const LOAD_MAIN_POST_FAILURE = "LOAD_MAIN_POST_FAILURE"

// 해쉬태그 검색 결과 로딩하는 액션
export const LOAD_HASHTAG_POSTS_REQUEST = "LOAD_HASHTAG_POSTS_REQUEST"
export const LOAD_HASHTAG_POSTS_SUCCESS = "LOAD_HASHTAG_POSTS_SUCCESS"
export const LOAD_HASHTAG_POSTS_FAILURE = "LOAD_HASHTAG_POSTS_FAILURE"

// 사용자가 어떤 게시글을 썼는지 로딩하는 액션
export const LOAD_USER_POSTS_REQUEST = "LOAD_USER_POSTS_REQUEST"
export const LOAD_USER_POSTS_SUCCESS = "LOAD_USER_POSTS_SUCCESS"
export const LOAD_USER_POSTS_FAILURE = "LOAD_USER_POSTS_FAILURE"

// 이미지업로드 하는 액션
export const UPLOAD_IMAGES_REQUEST = "UPLOAD_IMAGES_REQUEST"
export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS"
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE"

// 이미지 업로드한거 취소하는 액션, 비동기로 안하고 동기적으로 해도 되어서 3종세트 안씀
export const REMOVE_IMAGE = "REMOVE_IMAGE"

// 포스트 업로드
export const ADD_POSTS_REQUEST = "ADD_POST_REQUEST"
export const ADD_POSTS_SUCCESS = "ADD_POST_SUCCESS"
export const ADD_POSTS_FAILURE = "ADD_POST_FAILURE"

// like에 누르는 액션
export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST"
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS"
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE"

// unlike 누르는 액션
export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST"
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS"
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE"

// 댓글남기기
export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST"
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS"
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE"

// 댓글 불러오기
export const LOAD_COMMENTS_REQUEST = "LOAD_COMMENTS_REQUEST"
export const LOAD_COMMENTS_SUCCESS = "LOAD_COMMENTS_SUCCESS"
export const LOAD_COMMENTS_FAILURE = "LOAD_COMMENTS_FAILURE"

// 리트윗
export const RETWEET_REQUEST = "RETWEET_REQUEST"
export const RETWEET_SUCCESS = "RETWEET_SUCCESS"
export const RETWEET_FAILURE = "RETWEET_FAILURE"

// 포스트 삭제
export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST"
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS"
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE"

// 포스트 수정 <-- 숙제


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POSTS_REQUEST: {
      return {
        ...state,
        isAddingPost : true,
        postAdded : false,
        addPostErrorReason : ''
      }
    }

    case ADD_POSTS_SUCCESS: {
      return {
        ...state,
        isAddingPost : false,
        mainPosts : [action.data, ...state.mainPosts], // 기존에 있던 포스트에 새로운 포스트를 __앞에__추가!
        postAdded : true
      }
    } 

    case ADD_POSTS_FAILURE: {
      return {
        ...state,
        isAddingPost : false,
        addPostErrorReason : action.error
      }
    }

    // --- 
    case ADD_COMMENT_REQUEST: {
      return {
        ...state,
        isAddingComment : true,
        commentAdded : false,
        addCommentErrorReason : ''
      }
    }

    case ADD_COMMENT_SUCCESS: {
      
      // 불변성 유지를 위해서!!
      const postIndex = state.mainPosts.findIndex( v => v.id === action.data.postId)
      const post = state.mainPosts[postIndex]
      const Comments = [...post.Comments, dummyComment]
      const mainPosts = [...state.mainPosts]

      mainPosts[postIndex] = {...post, Comments}  // Comments만 새로운 Comments가 추가된 걸로 바꿔껴준 것
      
      return {
        ...state,
        isAddingComment : false,
        mainPosts,
        commentAdded : true
      }
    } 



    
    case ADD_COMMENT_FAILURE: {
      return {
        ...state,
        isAddingComment : false,
        addCommentErrorReason : action.error
      }
    }


    // case ADD_DUMMY: {
    //   return {
    //     ...state,
    //     mainPosts: [action.data, ...state.mainPosts],
    //   }
    // }

    default: {
      return {
        ...state,
      }
    }
  }
}

export default reducer
