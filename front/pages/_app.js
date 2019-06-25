// 공통된 레이아웃은 _app.js라는 특정 파일명으로 만들어 줘야함!
// 다른 컴포넌트들이 이 app.js를 부모로 삼을거임

import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import PropTypes from 'prop-types'

import reducer from '../reducers'
import { Provider } from 'react-redux'

import withRedux from 'next-redux-wrapper'
import {createStore} from 'redux'

const NodeBird = ({ Component, store }) => {
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
        <Component />   {/* <-- 이 부분이 자식 컴포넌트들 들어갈 자리!!! 이 사이에 공통되는 부분들이 들어감*/}
      </AppLayout>
    </Provider>
  );
};

NodeBird.propTypes = {
  Component : PropTypes.elementType // jsx에 들어갈 수 있는 모든 것을 elementType이라고 함
}

// 이 부분은 그냥 외우기
export default withRedux((initialState, options)=>{
  const store = createStore(reducer, initialState)
  // 여기에 store 커스터마이징 가능, 기본적으로는 이렇게
  return store;
})(NodeBird)
