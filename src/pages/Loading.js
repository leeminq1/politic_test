import React from 'react'
import styled from "styled-components";
// import { render } from "react-dom";
import { Bounce } from "react-activity";
import "react-activity/dist/library.css";


const Container = styled.div`
  margin-left:auto;
  margin-right:auto;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FED06E;
  flex-direction: column;
  position:relative;
  @media (min-width: 800px) {
    width: 600px;
    /* border:1px solid #95afc0; */
    /* border-left:1px solid #95afc0;
    border-right:1px solid #95afc0; */
  }
`;

const MainText=styled.h1`
   color:white;
   font-size:25px;
   font-weight:bolder;
   @media (min-width: 800px) {
    font-size:40px;
  }
`;
const LoadingContainer=styled.div`
    flex-direction:column;
    position:relative;
    top:35px;
    justify-content:flex-end;
    align-items:center;
    display:flex;
`;

const BottomText=styled.h1`
   color:#C0B27F;
   font-size:20px;
   font-weight:bolder;
  @media (min-width: 800px) {
    font-size:40px;
  }
`;

const Img=styled.img`
    width:60%;
    height:10%;
`;

const BottomImg=styled.img`
    width:100%;
    position:absolute;
    bottom:0px;
`;

export default function Loading() {
  return (
    <Container>
        <Img src={require('../assets/loading.png')}></Img>
        <MainText>나와 닮은 정치인은?</MainText>
        <LoadingContainer>
            <Bounce size={30} color="#BAAD7D"></Bounce>
            <BottomText>LOADING</BottomText>
        </LoadingContainer>
        <BottomImg src={require('../assets/png/LoadingBottom.png')}></BottomImg>
    </Container>
  )
}
