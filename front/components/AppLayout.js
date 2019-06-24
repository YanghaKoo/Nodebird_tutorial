import React, { Children } from "react"
import { Menu, Input, Button } from "antd"
import Link from "next/link"
import PropTypes from "prop-types"

// Menu가 겹치는 부분이고, 나머지 부분을 children으로 받아와서 아래에 표시해 주겠단 거지
// 다른 페이지에서 컨텐츠를 <AppLayout></AppLayout>으로 감싸줘야 하겠네
const AppLayout = ({ children }) => {
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>노드버드</a>
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
      {children}
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.elementType,
}

export default AppLayout
