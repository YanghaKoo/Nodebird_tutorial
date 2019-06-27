import React, { useCallback, useState, useEffect } from "react"
import { Form, Input, Button, Icon, Avatar, Card } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ADD_POSTS_REQUEST } from "../reducers/post"

let dummy = {
  User: {
    id: 2,
    nickname: "수경이",
  },
  content: "",
}

// HOOKS 주의사항, dispatch는 함수컴포너트 내에 있어야함,
// onSubmit과 같은 함수도 컴포넌트 내에 있어야함
const Postform = () => {
  const dispatch = useDispatch()
  const { isAddingPost, imagePaths, postAdded } = useSelector(state => state.post)
  const [text, setText] = useState('')

  useEffect(()=>{
    setText('')
  }, [postAdded === true])      // postAdded가 다른 값에서 true가 되는 순간 실행해주세요 라는 뜻
  
  // useCallback 두번째 인자 배열 안에는 함수 내에서 쓰는 state들 꼭 넣어주기
  const onSubmitPost = useCallback(e => {
    e.preventDefault()    
    dummy.content = text
    dispatch({
      type: ADD_POSTS_REQUEST,
      data: dummy,
    })    
  }, [text])

  const onChangeText = useCallback((e)=>{
    setText(e.target.value)
  }, [])
  
  return (
    <Form encType="multipart/form-data" style={{ margin: "10px 0 20px 0" }} onSubmit={onSubmitPost}>
      <Input.TextArea maxLength={140} placeholder="어떤 신기한 일이 있었나요?" value={text} onChange={onChangeText}/>
      <div>
        <Button>이미지 업로드</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit" loading={isAddingPost}>
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map(v => {
          return (
            <div key={v} style={{ display: "inline-block" }}>
              <img src={"http://localhost:3005/" + v} style={{ width: "200px" }} alt="" />
            </div>
          )
        })}
      </div>
    </Form>
  )
}

export default Postform
