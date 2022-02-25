import React from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components';
import {Container,TopContainer,TopTitle,ImageContainer,TopImage,BgImg,TopStart,
    ImageText,Btn,BottomContainer,BottomMainText,BootomSubText} from "../components/styledComponents"


const ImgTextSub=styled.h1`
  font-size:15px;
  font-weight:800;
  color:#b6b6b6;
  margin-top:-10px;
`;

function Home() {
  return (
    <Container>
      <TopContainer>
          <TopTitle>나와 닮은 정치인은?</TopTitle>
          <TopImage src={require("../assets/loading.png")}></TopImage>
      </TopContainer>
      <>
        <TopStart>START!</TopStart>
        <ImageContainer>
            <BgImg src={require("../assets/someone.png")}></BgImg>
            <>
                <ImageText>정면 얼굴 사진을 선택하십시오</ImageText>
                <ImgTextSub>Please choose a picture of your face.</ImgTextSub>
            </>
        </ImageContainer>
        <Link to="/main">
                <Btn>시작하기</Btn>
        </Link>
      </>
      <BottomContainer>
          <BottomMainText>얼굴인식 기술을 활용하여 나와 닮은 꼴 정치인을 찾아드립니다.</BottomMainText>
          <BootomSubText>We'll use facial recognition technology to find a politician who looks like me.</BootomSubText>
      </BottomContainer>
    </Container>
  )
}

export default Home