import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StyledButton } from "../components/Button";
import { StyledInput } from "../components/Input";
import { __loginUser } from "../redux/modules/userSlice";

const Login = () => {
  const { login } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  useEffect(() => {
    if (login) {
      navigate("/main/0");
    }
  }, [login]);

  useEffect(() => {
    if (pw.length > 7) {
      setPasswordValid(true);
    } else {
      console.log(pw.length, passwordValid);
      setPasswordValid(false);
    }
  }, [pw]);

  const loginHandler = () => {
    dispatch(
      __loginUser({
        email: id,
        password: pw,
      })
    );
    setId("");
    setPw("");
  };

  const handleId = (e) => {
    if (id.includes("@") && id.includes(".")) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
    setId(e.target.value);
  };

  const handlePw = (e) => {
    setPw(e.target.value);
  };

  return (
    <Flex>
      <LeftImage></LeftImage>
      <Main>
        <Stdiv>
          <StyledButton onClick={() => navigate("/")}> 홈 버튼 </StyledButton>
          <StHead>로그인</StHead>
          <StyledInput
            placeholder="Email"
            onChange={(e) => handleId(e)}
            value={id}
          />
          <StError>
            {!emailValid && id.length > 0 && (
              <div>올바른 이메일을 입력해주세요.</div>
            )}
          </StError>
          <StyledInput
            type="password"
            placeholder="Password"
            onChange={(e) => handlePw(e)}
            value={pw}
          />
          <StError>
            {!passwordValid && (
              <div>영문, 숫자 포함 8자 이상 입력해주세요.</div>
            )}
          </StError>
          <ButtonArea>
            <StyledButton onClick={() => navigate("/signup")}>
              Sign up
            </StyledButton>
            <StyledButton
              onClick={loginHandler}
              disabled={!(passwordValid && emailValid)}
            >
              Sign in
            </StyledButton>
          </ButtonArea>
        </Stdiv>
      </Main>
    </Flex>
  );
};

export default Login;

const Flex = styled.div`
  display: flex;
`;

const StError = styled.div`
  color: red;
  font-size: 12px;
`;

const LeftImage = styled.div`
  background-image: url("https://img.siksinhot.com/seeon/1622598477140625.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  width: 30%;
  height: 100vh;
`;
const Stdiv = styled.div`
  width: 700px;
  height: 700px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  border-radius: 10px;
  border: 3px solid #34495e;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StHead = styled.h1`
  color: #34495e;
  margin: 100px;
  font-size: 40px;
`;

const Main = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ButtonArea = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 7px;
`;
