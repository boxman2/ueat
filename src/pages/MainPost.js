import React, { useEffect } from "react";
import styled from "styled-components";
import MainPostCard from "../components/MainPostCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCookie } from "../shared/cookie";
import { loginCheck } from "../redux/modules/userSlice";
import { __getPostBox } from "../redux/modules/postSlice";

const MainPost = () => {
  const { number } = useParams();
  useEffect(() => {
    dispatch(__getPostBox({ num: number, page: 1 }));
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login } = useSelector((state) => state.user);
  const { pagesNum } = useSelector((state) => state.post);
  const { categoryId } = useSelector((state) => state.post);

  const logoutButton = () => {
    const a = dispatch(loginCheck(false));
    if (a.payload === false) {
      deleteCookie("token");
    }
  };
  const { postList } = useSelector((state) => state.post);

  const ClickKorean = () => {
    dispatch(__getPostBox({ num: 0, page: 1 }));
  };
  const ClickChinese = () => {
    dispatch(__getPostBox({ num: 1, page: 1 }));
  };
  const ClickJapanese = () => {
    dispatch(__getPostBox({ num: 2, page: 1 }));
  };
  const ClickWestern = () => {
    dispatch(__getPostBox({ num: 3, page: 1 }));
  };
  const ClickEtc = () => {
    dispatch(__getPostBox({ num: 4, page: 1 }));
  };

  const writeButton = () => {
    if (login === false) {
      alert("로그인하세요");
      navigate("/log");
    } else navigate("/post");
  };

  return (
    <>
      <WholeCard>
        <ButtonGroup>
          <HomeButton> 홈으로 </HomeButton>
          <ButtonTop onClick={ClickKorean} type="button" name="">
            한식
          </ButtonTop>
          <ButtonTop onClick={ClickChinese}>중식</ButtonTop>
          <ButtonTop onClick={ClickJapanese}>일식</ButtonTop>
          <ButtonTop onClick={ClickWestern}>양식</ButtonTop>
          <ButtonTop onClick={ClickEtc}>기타</ButtonTop>
          <WritePost onClick={writeButton}>글쓰기</WritePost>
          {!login ? (
            <SigninButton
              onClick={() => {
                navigate("/log");
              }}
            >
              Login
            </SigninButton>
          ) : (
            <SigninButton onClick={logoutButton}>Logout</SigninButton>
          )}
        </ButtonGroup>
        <MainCardWrapper>
          {postList?.map((data) => {
            return (
              <MainPostCard
                key={`main-post-${data.postId}`}
                data={data}
              ></MainPostCard>
            );
          })}
        </MainCardWrapper>
        <LeftHeader></LeftHeader>
      </WholeCard>

      <Pagination>
        {Array(pagesNum)
          .fill("")
          .map((el, i) => (
            <button
              key={`pagination_${i}`}
              onClick={() =>
                dispatch(__getPostBox({ num: categoryId, page: i + 1 }))
              }
            >
              {i + 1}
            </button>
          ))}
      </Pagination>
    </>
  );
};

const LeftHeader = styled.div`
  height: 70vh;
  width: 50vw;
  background-image: url("https://cdn.discordapp.com/attachments/1046343861129191446/1053529972632977468/vecteezy_one-continuous-line-drawing-of-a-young-male-chef-great-food_7435152.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 35vh;
  left: -15vw;
  z-index: -100;
  margin-left: -270px;
  margin-top: -10px;
`;
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ButtonTop = styled.button`
  color: #6b7a8d;
  width: 80px;
  border-radius: 25px;
  margin: 30px 0 0 35px;
  transition: 0.5s ease-in-out;
  font-size: 40px;
  border: none;
  cursor: pointer;
  :hover {
    transform: scale(1.3);
    border-color: white;
    transition: all 0.25s;
  }
`;
const WholeCard = styled.div`
  width: 1200px;
  margin: 0 auto;
  min-height: 90vh;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
`;
const MainCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const WritePost = styled.button`
  border: none;
  border-radius: 10px;
  color: black;
  margin: 200px 0 0 1000px;
  position: absolute;
  font-size: 20px;
  border-radius: 12px;
  cursor: pointer;
  :hover {
    transform: scale(1.3);
    transition: all 0.25s;
  }
`;

const HomeButton = styled.button`
  border: none;
  border-radius: 10px;
  color: black;
  margin: 200px 920px 0 0px;
  position: absolute;
  font-size: 20px;
  cursor: pointer;
  :hover {
    transform: scale(1.3);
    transition: all 0.25s;
  }
`;
const SigninButton = styled.button`
  color: black;
  margin: 10px 0 0 1000px;
  border: none;
  position: absolute;
  font-size: 20px;
  border-radius: 15px;
  transition: 0.3s;
  cursor: pointer;
  :hover {
    transform: scale(1.3);
    transition: all 0.25s;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  color: black;
  border-radius: 5px;
  text-decoration: none;
`;
export default MainPost;
