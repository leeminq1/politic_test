import React,{useState,useRef,useEffect} from 'react'
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
import KakaoShareBtn from '../components/KakaoSharedBtn';


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
    height: 100vh;
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
    height: 28%;
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
    border-radius:10px;
`;

const Title=styled.h1`
  font-size:20px;
  font-weight:bolder;   
  color:#224976;
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
    margin-left:5px;
    padding:5px 7px;
    @media (min-width: 800px) {
      font-size:30px;
  }
`;

const KeyText=styled.h1`
    text-align: center;
    color: #193354;
    font-size:15px;
    font-weight:bolder;
    margin-top:-10px;
    @media (min-width: 800px) {
      font-size:20px;
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
   background-color:${pros=>pros.name==="share"?"#183557":"#2E2E2E"};
   padding:10px 15px;
   border-radius:10px;
   color:${pros=>pros.name==="share"?"#ffffff":"#ffffff"};
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

const MoreInfoBtn=styled.button`
    background-color:#2E2E2E;
    padding:10px 15px;
    border-radius:10px;
    color:white;
    font-size:15px;
    font-weight:bolder;
    border-width:0px;
    display:flex;
    justify-content:center;
    align-items:center;
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
  /* position:relative;
  top:20px; */
  @media (min-width: 800px) {
    font-size:22px;
  }
`;

const BottomImg=styled.img`
    width:100%;
    height:30%;
    /* position:absolute;
    bottom:0px; */
    object-fit: contain;
    @media (min-width: 800px) {
      height:27%;
  }
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
    const [imgBase64, setImgBase64] = useState(""); // ?????? base64
    const [imgFile, setImgFile] = useState(null);	//??????
    const [loading,setLoading]=useState(false);
    const [showResult,setShowResult]=useState(false);
    const [predictionArr,setPredictionArr]=useState([]);
    const [result,setResult]=useState(null);
    const [keyword,setKeyword]=useState(null);

    const KakaoLoadOne=()=>{
      let ins = document.createElement('ins');
      let scr = document.createElement('script');
  
      ins.className = 'kakao_ad_area';
      ins.style = "display:none; width:100%;";
      scr.async = 'true';
      scr.type = "text/javascript";
      scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";
      ins.setAttribute('data-ad-width', '300');
      ins.setAttribute('data-ad-height', '250');
      ins.setAttribute('data-ad-unit', '?????? ?????? id');
  
      document.querySelector('.adfitOne').appendChild(ins);
      document.querySelector('.adfitOne').appendChild(scr);
    }

    const KakaoLoadTwo=()=>{
      let ins = document.createElement('ins');
      let scr = document.createElement('script');
      ins.className = 'kakao_ad_area';
      ins.style = "display:none; width:100%;";
      scr.async = 'true';
      scr.type = "text/javascript";
      scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";

      ins.setAttribute('data-ad-width', '320');
      ins.setAttribute('data-ad-height', '100');
      ins.setAttribute('data-ad-unit', '?????? ?????? id');
  
      document.querySelector('.adfitTwo').appendChild(ins);
      document.querySelector('.adfitTwo').appendChild(scr);

    }


    useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.js";
      script.async = true;
      document.body.appendChild(script);
      KakaoLoadOne();
      return () => {
        document.body.removeChild(script);
      };
    }, []);

    //react-router ??????
    const navigate=useNavigate();
    // input ????????? ???????????? ?????? ?????? ????????? ?????? ????????? ??????
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
      //??? ????????? ???
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
        case "?????????":
          setKeyword("?????? ?????? ??????????????????");
          break;
        case "?????????":
          setKeyword("????????? ????????? ?????????");
          break;
        case "?????????":
          setKeyword("????????? ?????? ??????");
          break;
        case "?????????":
          setKeyword("???????????? 19??? ?????????");
          break;
        case "?????????":
          setKeyword("BUILD BACK BETTER");
          break;
        case "???????????????":
          setKeyword("??????????????? ???????????? ????????? ???????????? ????????????");
          break;
        case "?????????":
          setKeyword("???????????????????????? ?????????");
          break;
        case "?????????":
          setKeyword("??????????????? ???4??????");
          break;
        case "??????":
          setKeyword("?????? ?????? ?????? ????????? ?????? ??????");
          break;
        case "???????????????":
          setKeyword("????????? ?????????????????? ??????");
          break;
        case "?????????":
          setKeyword("??????, ???????????????, ?????? ?????? CEO, ?????? ??????");
          break;
        case "?????????":
          setKeyword("Yes, We can!");
          break;
        case "?????????":
          setKeyword("????????? ?????? ???????????????, ??? ????????????");
          break;
        case "?????????":
          setKeyword("????????? ?????? ?????????, ??? ????????????");
          break;
        case "??????????????????":
          setKeyword("?????? ??? ????????????");
          break;
        case "?????????":
          setKeyword("MAKE AMERICA GREAT AGAIN!");
          break;
        case "??????":
          setKeyword("????????? ?????????");
          break;
        case "?????????":
          setKeyword("??? ?????? ?????????. ??? ???????????????");
          break;
        case "?????????":
          setKeyword("??????????????? ?????? ?????? ?????????. ??? ???21??? ????????????");
          break;
        case "?????????":
          setKeyword("?????? ????????? ?????? ?????? ????????? ??????");
          break;
        default:
          break;
      }
      console.log("?????????????????? : ",prediction[0].className)
      KakaoLoadTwo();
      
    }
  
    const handleChangeFile = (event) => {
      setLoading(true);
      setShowResult(false)
      setPredictionArr(null);
      setResult(null);
  
      let reader = new FileReader();
  
      reader.onloadend = () => {
        // 2. ????????? ???????????? ??????????????? ???????????????.
        const base64 = reader.result;
        if (base64) {
          setImgBase64(base64.toString()); // ?????? base64 ?????? ????????????
        }
      }
      if (event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]); // 1. ????????? ?????? ????????? ???????????????.
        setImgFile(event.target.files[0]); // ?????? ?????? ????????????
        init().then(
          console.log("init ??????"),
          predict()
        );
  
      }
    }

    const handleShare=()=>{
      if (navigator.share) {
        navigator.share({
            title: '?????? ?????? ?????????????',
            // text: 'Hello World',
            url: 'https://politictest.netlify.app/',
        });
    }else{
        alert("??????????????? ???????????? ?????? ???????????? ?????????.")
    }

    }


  return (
    <Container>
      <TopContainer>
          <TopTitle>?????? ?????? ?????????????</TopTitle>
          <TopImage src={require("../assets/loading.png")}></TopImage>
      </TopContainer>

      {showResult?<TopStart>????????????????</TopStart>:<TopStartLoading>{loading?"????????? ??????????????????!":"????????? ????????? ????????????!"}</TopStartLoading>}
      <ImageContainer onClick={()=>{
          inputRef.current.click();
      }}>
        <ImageUploadContainer ref={inputRef} onChange={handleChangeFile} type="file" accept="image/*" />
        {imgBase64?<Image id="srcImg" src={imgBase64}></Image>: 
        <>
          <BgImg src={require("../assets/someone.png")}></BgImg>
          <ImageText>GIVE ME A YOUR PICTURE!</ImageText>
        </>
        }
      </ImageContainer>
      {!loading&&result===null?<>
      <CommentMsg>???????????? ??? ????????? ????????? ??????, ??????
                  ???????????? ???????????? ???????????? ???????????????.</CommentMsg>
      <div className='adfitOne'></div>
      <BottomImg src={require('../assets/png/beforeLoading.png')}></BottomImg>
      </>:null}

      {loading&&result===null?
      <>
        <Dots size={45} color="#224976"></Dots>
        <Title>?????????...</Title>
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
            <SubText>{predictionArr[0].probability*100>80?"???????????? ????????????????":predictionArr[0].probability*100>50?"??????????????? ???????????????.":predictionArr[0].probability*100>20?"???????????? ?????? ????????????????":"3??? ?????????"}</SubText>
            <MoreInfoBtn onClick={()=>{
              if(predictionArr[0].className=="?????????"){
                window.open(`https://ko.wikipedia.org/wiki/?????????_?????????`,'_blank')
                return null
              }else if(predictionArr[0].className=="?????????"){
                window.open(`https://ko.wikipedia.org/wiki/????????????_?????????`,'_blank')
                return null
              }
              window.open(`https://ko.wikipedia.org/wiki/${predictionArr[0].className}`,'_blank')
            }}>?????????</MoreInfoBtn>
        </MiddleContainer>
        <ImageContainer>
            <Image id="srcImg" src={require(`../assets/${result}.jpg`)}></Image>
        </ImageContainer>
        <div className='adfitTwo'></div>    
        <RestResultRow>
          <RestResultCol>
            <RestResultScore>{showResult?`${(predictionArr[1].probability*100).toFixed(1)}%`:null}</RestResultScore>
            <RestResultRank>2???</RestResultRank>
            <RestResultName>{showResult?predictionArr[1].className:null}</RestResultName>
          </RestResultCol>
          <RestResultCol>
            <RestResultScore>{showResult?`${(predictionArr[2].probability*100).toFixed(1)}%`:null}</RestResultScore>
            <RestResultRank>3???</RestResultRank>
            <RestResultName>{showResult?predictionArr[2].className:null}</RestResultName>
          </RestResultCol>
        </RestResultRow>
        </>
      :null}
      {showResult?<BottomContainer>
        <KakaoShareBtn name={predictionArr[0].className}></KakaoShareBtn>
        <BottomBtn onClick={()=>{handleShare()}} name={"share"}><MdIosShare size={30} color="#ffffff"></MdIosShare></BottomBtn>
        <BottomBtn onClick={()=>{navigate("/") }} name={"retry"}><BsArrowCounterclockwise size={30} color="white" style={{marginRight:5}}></BsArrowCounterclockwise>????????????</BottomBtn>
      </BottomContainer>:null
      }

    </Container>
  )
}


export default Main
