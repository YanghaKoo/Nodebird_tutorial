import React, { Children, useEffect } from "react"
import { Menu, Input, Button, Row, Col, Card, Avatar, Form } from "antd"
import Link from "next/link"
import PropTypes from "prop-types"
import Loginform from "./Loginform"
import UserProfile from "./UserProfile"

import { useSelector, useDispatch } from "react-redux"
import {LOAD_USER_REQUEST} from '../reducers/user'

// Menu가 겹치는 부분이고, 나머지 부분을 children으로 받아와서 아래에 표시해 주겠단 거지
// 다른 페이지에서 컨텐츠를 <AppLayout></AppLayout>으로 감싸줘야 하겠네
const AppLayout = ({ children }) => {
  const { me } = useSelector(state => state.user)
  const dispatch = useDispatch()

  // 로그인을 안한 상태면 쿠키가 있는지 체크해줘라
  useEffect(()=>{
    if(!me) dispatch({type : LOAD_USER_REQUEST})
  },[])

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>Koowitter</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <Input.Search enterButton style={{ verticalAlign: "middle" }} />
        </Menu.Item>
      </Menu>
      <Link href="/signup">
        <a>
          <Button>회원가입</Button>
        </a>
      </Link>

      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <Loginform />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          3
        </Col>
      </Row>
    </div>
  )
}

// AppLayout.propTypes = {
//   children: PropTypes.elementType,
// }

export default AppLayout
