import React from "react"
import Link from "next/link"

// 해쉬태그를 LINK로 바꾸기 위해서 일단 <div></div>로 감싸줌, antd에서는 이런게 되나봐,
const PostCardContent = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s]+)/g).map(v => {
        // split에서 쪼갠애 포함하려면 정규표현식에서 () 붙이면 됨
        if (v.match(/(#[^\s]+)/g)) {
          return (
            <Link
              href={{ pathname: "/hashtag", query: { tag: v.slice(1) } }}  
              as={`/hashtag/${v.slice(1)}`}             // 동적인 애들은 이렇게 해줘야함 pathname, query, as 사용해서! 아 as는 내가 원하는 url 명
            >
              <a>{v}</a>
            </Link>
          )
        } else return v
      })}
    </div>
  )
}

export default PostCardContent
