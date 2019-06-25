import React, {useCallback} from "react"
import { Form, Input, Button } from "antd"
import { useInput } from "../pages/signup"

const Loginform = () => {
  const idHook = useInput("")
  const passwordHook = useInput("")

  const onSubmitForm = useCallback(e => {
    e.preventDefault()
    console.log(idHook.value, passwordHook.value)
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
        <Button type="primary" htmlType="submit" loading={false}>
          로그인
        </Button>
      </div>
    </Form>
  )
}

export default Loginform
