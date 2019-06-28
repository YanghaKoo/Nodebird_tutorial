import React, { useEffect } from "react"
import Postform from "../components/Postform"
import PostCard from "../components/PostCard"
import {LOAD_MAIN_POSTS_REQUEST} from '../reducers/post'

import { useDispatch, useSelector } from "react-redux"
import { loginAction, logoutAction } from "../reducers/user" // 액션을 가져와야지

const Home = () => {
  const dispatch = useDispatch() // < --- redux와 hooks를 연결하는 법!!!!  읽는게 아니라 액션을 디스패치 시킬 때 사용

  const { me } = useSelector(state => state.user) // 매개변수 state는 전체를 의미함, 그중 user리덕스를 가져와서 거기서 구조분해함
  const { mainPosts } = useSelector(state => state.post)


  useEffect(()=>{
    dispatch({type : LOAD_MAIN_POSTS_REQUEST})
  }, [])


  return (
    <div>      
      {me && <Postform />}
      {mainPosts.map(c => {
        return <PostCard post={c} key={c} />
      })}
    </div>
  )
}

export default Home
