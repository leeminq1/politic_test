import React from 'react'
import styled from "styled-components";
import { render } from "react-dom";

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
    border-left:1px solid #95afc0;
    border-right:1px solid #95afc0;
  }
`;

const MainText=styled.h1`
   color:white;
   font-size:3rem;
   font-weight:bolder;
`;
const LoadingContainer=styled.div`
    flex-direction:column;
    position:absolute;
    bottom:0;
    justify-content:center;
    align-items:center;
    display:flex;
    margin-bottom:2rem;
`;

const BottomText=styled.h1`
   color:#C0B27F;
   font-size:2rem;
   font-weight:bolder;
`;

const Img=styled.img`
    width:90%;
    height:20%;
`;

export default function Loading() {
  return (
    <Container>
        <Img src={require('../assets/loading.png')}></Img>
        <MainText>나와 닮은 정치인은?</MainText>
        <LoadingContainer>
            <Bounce size={50} color="#BAAD7D"></Bounce>
            <BottomText>LOADING</BottomText>
        </LoadingContainer>
    </Container>
  )
}
