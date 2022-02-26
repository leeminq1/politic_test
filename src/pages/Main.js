import React,{useState,useRef} from 'react'
// import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';
import styled from "styled-components";
import {TopContainer,TopTitle,TopImage,BgImg,
  ImageText} from "../components/styledComponents"
// import { render } from "react-dom";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { MdIosShare } from "react-icons/md";
import {BsArrowCounterclockwise} from "react-icons/bs";
import { useNavigate } from "react-router-dom";


import Dots from "react-activity/dist/Dots";
import "react-activity/dist/Dots.css";

// const URL = 'https://teachablemachine.withgoogle.com/models/F1nMeBJwX/';
const URL = 'https://teachablemachine.withgoogle.com/models/KAoZrcPlp/';
const modelURL = URL + 'model.json';
const metadataURL = URL + 'metadata.json';

let model

const Container = styled.div`
  margin-left:auto;
  margin-right:auto;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: white;
  flex-direction: column;
  position:relative;
  /* justify-content:space-evenly; */
  
  /* position:relative; */
  @media (min-width: 800px) {
    width: 600px;
    /* border-left:1px solid #95afc0;
    border-right:1px solid #95afc0; */
  }
`;


const ImageUploadContainer=styled.input`
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    display:none;
`;

const ImageContainer=styled.div`
    position:relative;
    width: 70%;
    height: 22%;
    display:flex;
    background-color:rgba(0, 0, 0, 0.07);
    border-radius:10px;
    /* border:3px dashed #535c68; */
    justify-content:center;
    align-items:center;
    box-shadow: 0px 0px 25px #576574;
    z-index:5;
    flex-direction:column;
    box-shadow: 0px 3px 20px 10px rgba(0, 0, 0, 0.10);
  `;


const Image=styled.img`
    width:90%;
    height:90%;
`;

const Title=styled.h1`
  font-size:20px;
  font-weight:bolder;   
  color:#341f97;
  @media (min-width: 800px) {
    font-size:25px;
  }
`;

const MiddleContainer=styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin-top:5%;
`;

const ResultContainer=styled.div`
    width:100%;
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
`;

const ReulstScore=styled.h1`
    color:#fed06e;
    font-size:20px;
    font-weight:bolder;
    margin-right:5px;
    @media (min-width: 800px) {
      font-size:30px;
  }
`;
const ReulstName=styled.h1`
    color:white;
    font-size:20px;
    font-weight:bolder;
    background-color:#304967;
    border-radius:5px;
    margin-left:5px;
    padding:5px 7px;
    @media (min-width: 800px) {
      font-size:30px;
  }
`;

const KeyText=styled.h1`
    text-align: center;
    color: #193354;
    font-size:20px;
    font-weight:bolder;
    margin-top:-10px;
    @media (min-width: 800px) {
      font-size:30px;
  }
`;

const SubText=styled.h1`
    text-align: center;
    color: #929292;
    font-size:15px;
    font-weight:bolder;
    margin-top:-10px;
    @media (min-width: 800px) {
      font-size:25px;
  }
`;

const BottomContainer=styled.div`
  width:100%;
  display:flex;
  flex-direction:row;
  justify-content:space-evenly;
  align-items:center;
  margin-top:10%;
`;

const BottomBtn=styled.button`
   background-color:${pros=>pros.name==="share"?"#FED16E":"#323232"};
   padding:10px 15px;
   border-radius:10px;
   color:${pros=>pros.name==="share"?"#353535":"#ffffff"};
   font-size:15px;
   font-weight:bolder;
   border-width:0px;
   display:flex;
   justify-content:space-evenly;
   align-items:center;
   flex-direction:row;
   @media (min-width: 800px) {
    font-size:20px;
    padding:15px 20px;
  }
`;

const TopStartLoading=styled.h1`
  font-size:20px;
  font-weight:bolder;   
  color:#0f3457;
  margin-top:3%;
  margin-bottom:30px;
  @media (min-width: 800px) {
    font-size:30px;
  }
`;

const TopStart=styled.h1`
  font-size:20px;
  font-weight:bolder;   
  color:#0f3457;
  margin-top:3%;
  @media (min-width: 800px) {
    font-size:30px;
  }
`;

const CommentMsg=styled.h1`
  font-size:13px;
  font-weight:bolder;
  color:#858585;
  width:70%;
  position:relative;
  top:20px;
  @media (min-width: 800px) {
    font-size:22px;
  }
`;

const BottomImg=styled.img`
    width:100%;
    height:30%;
    position:absolute;
    bottom:0px;
`;

const RestResultRow=styled.div`
  width:100%;
  display:flex;
  flex-direction:"row";
  justify-content:space-evenly;
  align-items:center;
`;

const RestResultCol=styled.div`
  display:flex;
  flex-direction:"row";
  justify-content:center;
  align-items:center;
`;

const RestResultScore=styled.h1`
    text-align: center;
    color: #ebc877;
    font-size:17px;
    font-weight:bolder;
    margin-right:10px;
    @media (min-width: 800px) {
      font-size:30px;
  }
`;

const RestResultRank=styled.h1`
    text-align: center;
    color: #585858;
    font-size:17px;
    font-weight:bolder;
    margin-right:5px;
    @media (min-width: 800px) {
      font-size:30px;
  }
`;

const RestResultName=styled.h1`
    text-align: #909090;
    color: #585858;
    font-size:17px;
    font-weight:bolder;
    @media (min-width: 800px) {
      font-size:30px;
  }
`;


const Main = ({history}) => {
    const [imgBase64, setImgBase64] = useState(""); // 파일 base64
    const [imgFile, setImgFile] = useState(null);	//파일
    const [loading,setLoading]=useState(false);
    const [showResult,setShowResult]=useState(false);
    const [predictionArr,setPredictionArr]=useState([]);
    const [result,setResult]=useState(null);
    const [keyword,setKeyword]=useState(null);

    //react-router 사용
    const navigate=useNavigate();
    // input 태그를 클릭하는 것과 같은 효과를 주기 위해서 사용
    const inputRef=useRef();
    
  // Load the image model and setup the webcam
    async function init() {

      // let isIos = false; 
      // // fix when running demo in ios, video will be frozen;
      // if (window.navigator.userAgent.indexOf('iPhone') > -1 || window.navigator.userAgent.indexOf('iPad') > -1) {
      //   isIos = true;
      // }
      // load the model and metadata
      // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
      // or files from your local hard drive
      // Note: the pose library adds "tmImage" object to your window (window.tmImage)
      model = await tmImage.load(modelURL, metadataURL);
      //총 클래스 수
      let maxPredictions;
      maxPredictions = model.getTotalClasses();
  }
  
    async function predict() {
      // predict can take in an image, video or canvas html element
      model = await tmImage.load(modelURL, metadataURL);
      const tempImage = document.getElementById('srcImg');
      const prediction = await model.predict(tempImage, false);
      prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
      setPredictionArr(prediction)
      setShowResult(true)
      setLoading(false)
      setResult(prediction[0].className)
      switch(prediction[0].className){
        case "김정은":
          setKeyword("김정은 말");
          break;
        case "마크롱":
          setKeyword("마크롱 말");
          break;
        case "메르켈":
          setKeyword("메르켈 말");
          break;
        case "문재인":
          setKeyword("문재인 말");
          break;
        case "바이든":
          setKeyword("바이든 말");
          break;
        case "보리스존슨":
          setKeyword("보리스존슨 말");
          break;
        case "시진핑":
          setKeyword("시진핑 말");
          break;
        case "심상정":
          setKeyword("심상정 말");
          break;
        case "아베":
          setKeyword("아베 말");
          break;
        case "아웅산수치":
          setKeyword("아웅산수치 말");
          break;
        case "안철수":
          setKeyword("안철수 말");
          break;
        case "오바마":
          setKeyword("오바마 말");
          break;
        case "윤석열":
          setKeyword("윤석열 말");
          break;
        case "이재명":
          setKeyword("이재명 말");
          break;
        case "줄리아길라드":
          setKeyword("줄리아길라드 말");
          break;
        case "트럼프":
          setKeyword("트럼프 말");
          break;
        case "푸틴":
          setKeyword("러시아 상남자");
          break;
        case "허경영":
          setKeyword("허경영 말");
          break;
        case "홍준표":
          setKeyword("홍준표 말");
          break;
        case "힐러리":
          setKeyword("힐러리 말");
          break;
        default:
          break;
      }
      console.log("가장높은확률 : ",prediction[0].className)
      
    }
  
    const handleChangeFile = (event) => {
      setLoading(true);
      setShowResult(false)
      setPredictionArr(null);
      setResult(null);
  
      let reader = new FileReader();
  
      reader.onloadend = () => {
        // 2. 읽기가 완료되면 아래코드가 실행됩니다.
        const base64 = reader.result;
        if (base64) {
          setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
        }
      }
      if (event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
        setImgFile(event.target.files[0]); // 파일 상태 업데이트
        init().then(
          console.log("init 모델"),
          predict()
        );
  
      }
    }
  return (
    <Container>
      <TopContainer>
          <TopTitle>나와 닮은 정치인은?</TopTitle>
          <TopImage src={require("../assets/loading.png")}></TopImage>
      </TopContainer>
      {showResult?<TopStart>분석결과는?</TopStart>:<TopStartLoading>{loading?"잠시만 기다려주세요!":"사진을 업로드 해주세요!"}</TopStartLoading>}
      <ImageContainer onClick={()=>{
          inputRef.current.click();
      }}>
        <ImageUploadContainer ref={inputRef} onChange={handleChangeFile} type="file" accept="image/*;capture=camera" />
        {imgBase64?<Image id="srcImg" src={imgBase64}></Image>: 
        <>
          <BgImg src={require("../assets/someone.png")}></BgImg>
          <ImageText>GIVE ME A PICTURE YOUR PICTURE!</ImageText>
        </>
        }
      </ImageContainer>
      {!loading&&result===null?<>
      <CommentMsg>※업로드 된 사진은 별도로 수집, 보존
                  하지않고 얼굴인식 용도에만 사용됩니다.</CommentMsg>
      <BottomImg src={require('../assets/png/beforeLoading.png')}></BottomImg>
      </>:null}

      {loading&&result===null?
      <>
        <Dots size={45} color="blue"></Dots>
        <Title>분석중...</Title>
        <BottomImg src={require('../assets/png/NowLoading.png')}></BottomImg>
        </>
      :null
    }
    {showResult&&result!==null?
        <>
        <MiddleContainer>
            <FaArrowAltCircleDown size={40} color="#323232"></FaArrowAltCircleDown>
            <ResultContainer>
                <ReulstScore>{showResult?`${(predictionArr[0].probability*100).toFixed(1)}%`:null}</ReulstScore>
                <ReulstName>{showResult?predictionArr[0].className:null}</ReulstName>
            </ResultContainer>
            <KeyText>{keyword}</KeyText>
            <SubText>도플갱어인가요?</SubText>
            </MiddleContainer>
            <ImageContainer>
                <Image id="srcImg" src={require(`../assets/${result}.jpg`)}></Image>
            </ImageContainer>
            <RestResultRow>
              <RestResultCol>
                <RestResultScore>{showResult?`${(predictionArr[1].probability*100).toFixed(1)}%`:null}</RestResultScore>
                <RestResultRank>2위</RestResultRank>
                <RestResultName>{showResult?predictionArr[1].className:null}</RestResultName>
              </RestResultCol>
              <RestResultCol>
                <RestResultScore>{showResult?`${(predictionArr[2].probability*100).toFixed(1)}%`:null}</RestResultScore>
                <RestResultRank>3위</RestResultRank>
                <RestResultName>{showResult?predictionArr[2].className:null}</RestResultName>
              </RestResultCol>
            </RestResultRow>
        </>
      :null}
      {showResult?<BottomContainer>
        <BottomBtn name={"share"}><MdIosShare size={30} color="black" style={{marginRight:5}}></MdIosShare>공유하기</BottomBtn>
        <BottomBtn onClick={()=>{navigate("/") }} name={"retry"}><BsArrowCounterclockwise size={30} color="white" style={{marginRight:5}}></BsArrowCounterclockwise>다시하기</BottomBtn>
      </BottomContainer>:null
      }

    </Container>
  )
}


export default Main
