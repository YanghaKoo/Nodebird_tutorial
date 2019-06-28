import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  LOAD_HASHTAG_POSTS_REQUEST,
} from "../reducers/post"
import PostCard from "../components/PostCard"

const Hashtag = ({ tag }) => {
  const dispatch = useDispatch()
  const { mainPosts } = useSelector(state => state.post)
  
  useEffect(() => {
    dispatch({ type: LOAD_HASHTAG_POSTS_REQUEST, data: tag })
  }, [])

  return (
    <div>
      {mainPosts.map(c => {
        return <PostCard key={+c.createdAt} post={c} />
      })}
    </div>
  )
}

// 프론트 express 서버에서 받은 param을 여기서 받는 거임!!
// 얘의 역할은 가장 먼저 시작함!! cdm보다도 먼저 시작해서 최초의 작업, --> 서버쪽의 데이터를 댕겨오거나, 서버쪽에서 실행될 것을 실행시킬 수 있음
// 프론트에서도 서버세어도 실행됨

// **서버사이드 렌더링 시에도 얘가 중요**, next에서 가장 중요한 라이프사이클!!
Hashtag.getInitialProps = async context => {
  console.log("hashtag getinitailprops", context.query.tag)
  // context.query.tag에 /hashtag/:tag의 tag가 들어있음
  // ex) /hashtag/가위바위보 --> context.query.tag : '가위바위보'
  return { tag: context.query.tag }
}

export default Hashtag
