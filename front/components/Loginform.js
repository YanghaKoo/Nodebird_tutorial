import React, {useCallback} from "react"
import { Form, Input, Button } from "antd"
import { useInput } from "../pages/signup"    // TODO - util 폴더 만들고 옮기기
import {useDispatch, useSelector} from 'react-redux'    
import {LOG_IN_REQUEST} from '../reducers/user'

const Loginform = () => {
  const idHook = useInput("")
  const passwordHook = useInput("")
  const dispatch = useDispatch()
  
  const { isLoggingIn } = useSelector(state => state.user)  // 로그인 시도중인지 여부

  const onSubmitForm = useCallback(e => {
    e.preventDefault()
    dispatch({
      type : LOG_IN_REQUEST,
      data : { userId : idHook.value, password : passwordHook.value}
    })     
  },[idHook.value, passwordHook.value])




  return (
    <Form onSubmit={onSubmitForm} style={{padding : 10}}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" required {...idHook} />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input name="user-password" required {...passwordHook} type="password"/>
      </div>
      <div style={{marginTop : 10}}>
        <Button type="primary" htmlType="submit" loading={isLoggingIn}>
          로그인
        </Button>
      </div>
    </Form>
  )
}

export default Loginform
