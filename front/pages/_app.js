// 공통된 레이아웃은 _app.js라는 특정 파일명으로 만들어 줘야함!
// 다른 컴포넌트들이 이 app.js를 부모로 삼을거임

import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import PropTypes from 'prop-types'

const NodeBird = ({ Component }) => {
  return (
    <>
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
    </>
  );
};

NodeBird.propTypes = {
  Component : PropTypes.elementType // jsx에 들어갈 수 있는 모든 것을 elementType이라고 함
}

export default NodeBird;
