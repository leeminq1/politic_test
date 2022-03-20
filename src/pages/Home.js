import React,{useEffect} from 'react'
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

  const KakaoLoad=()=>{
    let ins = document.createElement('ins');
    let scr = document.createElement('script');

    ins.className = 'kakao_ad_area';
    ins.style = "display:none; width:100%;";
    scr.async = 'true';
    scr.type = "text/javascript";
    scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";
    ins.setAttribute('data-ad-width', '300');
    ins.setAttribute('data-ad-height', '250');
    ins.setAttribute('data-ad-unit', '광고 단위 id');

    document.querySelector('.adfit').appendChild(ins);
    document.querySelector('.adfit').appendChild(scr);
  }

  useEffect(()=>{
    KakaoLoad();
  },[])


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
      <div className='adfit'></div>
    </Container>
  )
}

export default Home
