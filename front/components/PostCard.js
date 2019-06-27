import React, { useState, useCallback, useEffect } from "react"
import { Card, Icon, Button, Avatar, Input, Comment, Form, List } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ADD_COMMENT_REQUEST } from "../reducers/post"

const PostCard = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false)
  const [commentText, setCommentText] = useState("")
  const { me } = useSelector(state => state.user)
  const { commentAdded, isAddingComment } = useSelector(state => state.post)
  const dispatch = useDispatch()

  
  // comment가 등록이 될 때, 창을 초기화 해줌
  useEffect(()=>{
    setCommentText('')
  },[commentAdded === true])

  // 댓글창 표시/비표시
  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev) // 토글할땐 이렇게 함수형으로 하는구나
  }, [])


  // 댓글 내용 제출
  const onSubmitComment = useCallback(
    e => {
      e.preventDefault()
      if (!me) return alert("로그인이 필요합니다.")
      else return dispatch({ type: ADD_COMMENT_REQUEST, data: { postId: post.id } })
    },
    [me && me.id],
  ) //useCallback에서 state를 쓰면 여기에 넣어주기, 객체인 경우 이렇게!

  const onChangeComment = useCallback(e => {
    setCommentText(e.target.value)
  }, [])


  return (
    <div>
      <Card
        key={+post.createdAt}
        cover={post.img && <img alt="" src={post.img} />}
        actions={[
          <Icon type="retweet" key="retweet" />,
          <Icon type="heart" key="heart" />,
          <Icon type="message" key="message" onClick={onToggleComment} />,
          <Icon type="ellipsis" key="ellipsis" />,
        ]}
        extra={<Button>팔로우</Button>}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={post.content}
        />
      </Card>
      {commentFormOpened && (
        <>
          <Form onSubmit={onSubmitComment}>
            <Form.Item>
              <Input.TextArea rows={4} value={commentText} onChange={onChangeComment} />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={isAddingComment}>
              삐약
            </Button>
          </Form>
          <List
            header={`${post.Comments ? post.Comments.length : 0} 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments || []}
            renderItem={item => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                  
                />
              </li>
            )}
          />
        </>
      )}
    </div>
  )
}

export default PostCard
