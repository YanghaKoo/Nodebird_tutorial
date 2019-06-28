// 공통된 레이아웃은 _app.js라는 특정 파일명으로 만들어 줘야함!
// 다른 컴포넌트들이 이 app.js를 부모로 삼을거임

import React from "react"
import Head from "next/head"
import AppLayout from "../components/AppLayout"
import PropTypes from "prop-types"

import reducer from "../reducers"
import { Provider } from "react-redux"

import withRedux from "next-redux-wrapper"
import { createStore, compose, applyMiddleware } from "redux"

import createSagaMiddleware from "redux-saga" // sagaMiddleware 추가, 연결
import rootSaga from "../saga" // sagamiddleware에 rootsaga를 연결해 줘야함

const NodeBird = ({ Component, store, pageProps }) => {     // Component : 하위 컴포넌트 애들, store : redux의 store, pageProps : param을 위해서 넘겨줌
  return (
    <Provider store={store}>
      {/*  antd css 파일 헤드에 넣어주기!! */}
      <Head>
        <title>Nodebird</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"
        />
      </Head>

      <AppLayout>
        <Component {...pageProps}/>{" "}
        {/* <-- 이 부분이 자식 컴포넌트들 들어갈 자리!!! 이 사이에 공통되는 부분들이 들어감*/}
      </AppLayout>
    </Provider>
  )
}

NodeBird.propTypes = {
  Component: PropTypes.elementType, // jsx에 들어갈 수 있는 모든 것을 elementType이라고 함
}


// CHAP 6)) 이 부분을 추가해 줘야지, 프론트서버 epxress를 통해 param받는게 최종적으로 가능하다
NodeBird.getInitialProps = async context => {   // 1) context는 next에서 내려줌
  const { ctx, Component } = context  // 2) 그 안에 ctx라는게 들어있어
  let pageProps = {}
  if(Component.getInitialProps) pageProps = await Component.getInitialProps(ctx)  // getInitialProps가 있으면 실행시켜, hashtag랑 user페이지에만 추가했지
  return { pageProps }
}



// 이 부분은 그냥 외우기 (redux)
export default withRedux((initialState, options) => {
  // 여기다 추가로 넣을 미들웨어들을 넣어주면 됨!!, 여기만 바뀔 여지가 있는 것
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware] // 넣고싶은 미들웨어들 여기다 넣으면 됨

  // 이 아래 부분은 바뀔일이 거의 없음
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : compose(
          applyMiddleware(...middlewares),
          !options.isServer &&
            typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f,
        )

  const store = createStore(reducer, initialState, enhancer)
  sagaMiddleware.run(rootSaga)
  return store
})(NodeBird)
