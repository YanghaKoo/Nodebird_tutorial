// 공통된 레이아웃은 _app.js라는 특정 파일명으로 만들어 줘야함!
// 다른 컴포넌트들이 이 app.js를 부모로 삼을거임

import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";

const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <title>Nodebird</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"
        />
        {/*  antd css 파일 헤드에 넣어주기!! */}
      </Head>

      <AppLayout>
        <Component />{" "}
        {/*이 부분이 자식 컴포넌트들 들어갈 자리!!! 이 사이에 들어갈 거란거지*/}
      </AppLayout>
    </>
  );
};

export default NodeBird;
