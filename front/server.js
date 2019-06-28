// ## : 여기는 next와 express를 사용한 프론트 서버 구축!!!!!!!

/*
  왜하냐?
  /hashtag/가위바위보
  /user/3     과 같은 동적인 주소를 가져오기 위해서 !! 
  나는 CRA써서 됐던거고  next에서는 자체적으로는 안되고 front 서버가 필요함!



*/

// 해쉬태깅 뭐 할 때, 와일드카드 (/user/:id 이런거)이게 next에서 안되는 게 있어서 express가 필요하다 했음
// next와 express가 이어짐
// express가 그 안에서 next를 돌림 --> 둘이 공존

const express = require("express")
const next = require("next") // 이렇게 next도 가져와줘
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const expressSession = require("express-session")
const dotenv = require("dotenv")

const dev = process.env.NODE_ENV !== "production"
const prod = process.env.NODE_ENV === "production"

dotenv.config()

// 중요!! expree와 next 연결!!
const app = next({ dev }) // true겠지 지금 개발모드니까
const handle = app.getRequestHandler()

// next쪽 코드라 새로우실 거에요(prepare)
app.prepare().then(() => {
  const server = express()
  server.use(morgan("dev"))
  server.use(express.json())
  server.use(express.urlencoded({ extended: true }))
  server.use(cookieParser(process.env.COOKIE_SECRET))
  server.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: false,
      },
    }),
  )

  // /hashtag/가위바위보 와 같은 것들 요청받는애
  server.get("/hashtag/:tag", (req, res) => {
    return app.render(req, res, "/hashtag", { tag: req.params.tag }) // app이 next지, next로 요청 응답 넣어주면 됨, 파라미터 넘겨주고
  })

  // /user/1과 같은 애들 요청받는 애
  server.get("/hashtag/:id", (req, res) => {
    return app.render(req, res, "/user", { id: req.params.id })
  })

  // 나머지 모든 get요청 여기서 다 처리하겠다
  server.get("*", (req, res) => {
    return handle(req, res) // get 요청 처리기
  })

  server.listen(3060, () => {
    console.log("next express run 3060")
  })
})

/*
  서버쪽에서 saga를 돌려서 미리 정보를 채워놓고, 프론트로 넘겨줄 수 있다???



*/
