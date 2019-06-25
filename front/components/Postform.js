import React from "react"
import { Form, Input, Button, Icon, Avatar, Card } from "antd"

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

const Postform = () => {
  return (
    <Form encType="multipart/form-data" style={{ margin: "10px 0 20px 0" }}>
      <Input.TextArea
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <Button>이미지 업로드</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          짹짹
        </Button>
      </div>
      <div>
        {dummy.imagePaths.map(v => {
          return (
            <div key={v} style={{ display: "inline-block" }}>
              <img
                src={"http://localhost:3005/" + v}
                style={{ width: "200px" }}
                alt=""
              />
            </div>
          )
        })}
      </div>
    </Form>
  )
}

export default Postform
