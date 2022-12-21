import React from "react";
import logo from "../img/logo.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Stdiv>
      <StLog
        onClick={() => {
          navigate("log");
        }}
      >
        login
      </StLog>
      <StImg>
        <img alt="logo" src={logo} />
      </StImg>
      <StSelect>
        <StLink to="/main">
          <div> 한식 </div>
        </StLink>
        <StLink to="/main">
          <div> 일식 </div>
        </StLink>
        <StLink to="/main">
          <div> 양식 </div>
        </StLink>
        <StLink to="/main">
          <div> 중식 </div>
        </StLink>
        <StLink to="/main">
          <div> 기타 </div>
        </StLink>
      </StSelect>
    </Stdiv>
  );
};

export default Home;

const Stdiv = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)),
    url("https://images.pexels.com/photos/8951558/pexels-photo-8951558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
`;

const StImg = styled.div`
  position: absolute;
  z-index: 2px;
  margin: 70px 0 0 50px;
`;

const StLink = styled(Link)`
  font-size: 35px;
  text-decoration: none;
  color: black;
  display: flex;
  flex-direction: column;
  margin: 50px 0 0 50px;
  color: white;
  :hover {
    transform: scale(1.4);
    color: red;
    transition: all 0.25s;
  }
`;

const StLog = styled.div`
  font-size: 50px;
  position: absolute;
  justify-content: flex-end;
  margin: 30px 0 0 1770px;
  overflow: hidden;
  cursor: pointer;
  :hover {
    transform: scale(1.4);
    color: white;
    transition: all 0.25s;
  }
`;

const StSelect = styled.div`
  font-size: 30px;
  display: flex;
  justify-content: flex-end;
  padding: 0 300px 0 0;
  font: small-caps bold 24px/1 sans-serif;
`;
