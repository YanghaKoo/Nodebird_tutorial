import React, { useCallback } from "react"
import { Card, Avatar, Button } from "antd"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { LOG_OUT_REQUEST } from "../reducers/user"

const UserProfile = () => {
  const dispatch = useDispatch()
  const { followingList, followerList, posts, me } = useSelector(state => state.user)
  

  const onLogout = useCallback(() => {
    dispatch({
      type : LOG_OUT_REQUEST
    })
  })

  return (
    <Card
      actions={[
        <div key="twit">
          짹짹
          <br />
          {posts.length}
        </div>,
        <div key="following">
          팔로잉
          <br />
          {followingList.length}
        </div>,
        <div key="follower">
          팔로워
          <br />
          {followerList.length}
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>
  )
}

export default UserProfile
