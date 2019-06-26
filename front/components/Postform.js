import React from "react"
import { Form, Input, Button, Icon, Avatar, Card } from "antd"
import {useSelector} from 'react-redux'


const Postform = () => {

  const {imagePaths} = useSelector(state =>state.post)
  // const {isLoggedIn } = useSelector(state=> state.user)

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
        {imagePaths.map(v => {
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
