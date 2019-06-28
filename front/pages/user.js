import React, { useEffect } from "react"
import { LOAD_USER_POSTS_REQUEST } from "../reducers/post"
import { LOAD_USER_REQUEST } from "../reducers/user"
import { useDispatch, useSelector } from "react-redux"
import { Avatar, Card } from "antd"
import PostCard from "../components/PostCard"

const User = ({ id }) => {
  const dispatch = useDispatch()
  const { mainPosts } = useSelector(state => state.post)
  const { userInfo } = useSelector(state => state.user)
  useEffect(() => {
    dispatch({ type: LOAD_USER_POSTS_REQUEST, data: id })
    dispatch({ type: LOAD_USER_REQUEST, data: id })
  }, [])

  return (
    <div>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
          />
        </Card>
      ) : null}
      {mainPosts.map(c => {
        return <PostCard key={+c.createdAt} post={c} />
      })}
    </div>
  )
}

User.getInitialProps = async context => {
  console.log("hashtag getinitailprops", context.query.id)
  return { id: parseInt(context.query.id) } // <--- 이 부분!
}

export default User
