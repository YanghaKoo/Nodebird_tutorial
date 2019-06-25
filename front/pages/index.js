import React from "react"
import { Button, Icon, Avatar, Card } from "antd"
import Postform from "../components/Postform"
import PostCard from "../components/PostCard"

const dummy = {
  isLoggedIn: true,
  imagePaths: [],
  mainPosts: [
    {
      User: {
        id: 1,
        nickname: "구양하",
      },
      content: "첫 게시글",
      img: "https://koostagram.xyz/img/20190524_2256341559372395228.jpg",
    },
  ],
}

const Home = () => {
  return (
    <div>
      {dummy.isLoggedIn && <Postform />}
      {dummy.mainPosts.map(c => {
        return <PostCard post={c} key={c} />
      })}
    </div>
  )
}

export default Home
