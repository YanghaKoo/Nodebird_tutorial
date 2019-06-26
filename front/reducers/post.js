export const initialState = {
  mainPosts: [{
    User : {
      id: 1,
      nickname : "안수경"
    },
    content : "첫 게시글!!",
    img : "https://koostagram.xyz/img/20190524_2256341559372395228.jpg",
    
  }],
  imagePaths : []
}

export const ADD_POST = "ADD_POST"
export const ADD_DUMMY = "ADD_DUMMY"



const addPost = {
  type: ADD_POST,
}

const addDummy = {
  type: ADD_DUMMY,
  data: {
    content: "Hello",
    UserId: 1,
    User: {
      nickname: "구양하",
    },
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
      }
    }

    case ADD_DUMMY: {
      return {
        ...state,
        mainPosts: [action.data, ...state.mainPosts],
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
