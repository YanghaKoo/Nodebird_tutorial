import React from "react"
import { List, Button, Icon, Card } from "antd"
import NicknameEditForm from "../components/NicknameEditForm"

const Profile = () => {
  return (
    <div>
      <NicknameEditForm />

      <List
        style={{ marginBottom: 20 }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        header={<div>팔로워 목록</div>}
        loadMore={<Button style={{ width: "100%" }}>더 보기</Button>}
        bordered
        dataSource={["구양하", "바보", "노드버드"]}
        renderItem={item => (
          <List.Item style={{ marginTop: 20 }}>
            <Card actions={[<Icon type="stop" key="stop" />]}>
              <Card.Meta description={item} />
            </Card>
          </List.Item>
        )}
      />

      <List
        style={{ marginBottom: 20 }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        header={<div>팔로잉 목록</div>}
        loadMore={<Button style={{ width: "100%" }}>더 보기</Button>}
        bordered
        dataSource={["안수경", "농협", "서현역"]}
        renderItem={item => (
          <List.Item style={{ marginTop: 20 }}>
            <Card actions={[<Icon type="stop" key="stop" />]}>
              <Card.Meta description={item} />
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
}

export default Profile
