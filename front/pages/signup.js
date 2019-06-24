import React, { useState, useCallback } from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import { Form, Input, Checkbox, Button } from "antd";

const Signup = () => {
  /*
   PROPS로 함수를 넘겨줄 떄는 USECALLBACK 필수!!!!, 왜냐면 이렇게 안하고 넘겨주면 함수가 계속 재생성, 그리고 하위 컴포넌트가 재 랜더링 됨
   주로 e가 들어간 이벤트 리스터에 넣어줌!
   ***그리고 useCallback 내부에서 쓰는 state를 디펜던시 배열에 넣어줘야함!!!***
  */

  // 단순 인풋 Custom Hook으로
  const useInput = initValue => {
    const [value, setter] = useState(initValue);
    const onChange = useCallback(e => {
      setter(e.target.value);
    });
    return { value, onChange };
  };

  const idHook = useInput("");
  const nickHook = useInput("");
  const passwordHook = useInput("");

  // 패스워드 체크와 term은 일반적이지 않은 경우이니 따로
  const [passwordCheck, setPasswordCheck] = useState("");
  const [term, setTerm] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (passwordHook.value !== passwordCheck) return setPasswordError(true);
      if (!term) return setTermError(true);

      console.log({
        id: idHook.value,
        nick: nickHook.value,
        password: passwordHook.value,
        passwordCheck,
        term
      });
    },
    [passwordHook.value, passwordCheck, term]
  ); // 함수 내에서 쓴 3개의 state를 디펜던시로 넣어줌(콘솔은 내가 보는거니까 제외)

  const onChangePasswordChk = useCallback(
    e => {
      setPasswordError(e.target.value !== passwordHook.value);
      setPasswordCheck(e.target.value);
    },
    [passwordHook.value]
  ); // 안에서 passwordHook.value란 state를 썼으니 디펜던시 넣어주는 것

  const onChangeTerm = useCallback(e => {
    setTermError(false);
    setTerm(e.target.checked); // e.target.checked!! 이거로 체크박스 할 수 있네
  });

  return (
    <>
      <Form onSubmit={onSubmit} style={{ padding: 10 }}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input name="user-id" required {...idHook} />
        </div>
        <div>
          <label htmlFor="user-nick">닉네임</label>
          <br />
          <Input name="user-nick" required {...nickHook} />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            name="user-password"
            type="password"
            required
            {...passwordHook}
          />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호 체크</label>
          <br />
          <Input
            name="user-password-check"
            type="password"
            required
            value={passwordCheck}
            onChange={onChangePasswordChk}
          />
          {passwordError && (
            <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</div>
          )}
        </div>
        <div>
          <Checkbox name="user-term" value={term} onChange={onChangeTerm}>
            약관 동의 함
            {termError && (
              <div style={{ color: "red" }}>약관에 동의하셔야 합니다.</div>
            )}
          </Checkbox>
        </div>
        <div style={{ marginTop: 3 }}>
          <Button type="primary" htmlType="submit">
            가입하기
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Signup;
