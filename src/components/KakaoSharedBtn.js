import React, { useEffect } from "react";
import styled from "styled-components";
import { RiKakaoTalkFill } from "react-icons/ri";

const KakaoShareButton = styled.button`
   background-color:#FED16E;
   padding:10px 15px;
   border-radius:10px;
   color:#353535;
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

const KakaoShareBtn = ({name}) => {

    useEffect(() => {
    createKakaoButton({name});
  }, [name]);


  const createKakaoButton = ({name}) => {
    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
    if (window.Kakao) {
      const kakao = window.Kakao;
      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init("6a65244ba444cbcf5d68ca0dba13c6a6");
      }
      kakao.Link.createDefaultButton({
        // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
        container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: "나와 닮은 정치인은?",
          description: `나와 닮은 정치인은 ${name}이네요! 결과를 확인하고 공유해보세요!`,
          imageUrl: `https://politictest-8f628.firebaseapp.com/result/${name}.jpg`,
          link: {
            mobileWebUrl: "https://politictest-8f628.firebaseapp.com/",
            webUrl: "https://politictest-8f628.firebaseapp.com/",
          },
        },
        buttons: [
          {
            title: "웹으로 보기",
            link: {
                mobileWebUrl: "https://politictest-8f628.firebaseapp.com/",
                webUrl: "https://politictest-8f628.firebaseapp.com/",
              },
          },
        ],
      });
    }
  };
  return (
    <KakaoShareButton id="kakao-link-btn">
        공유하기
        <RiKakaoTalkFill size={30} color="black" style={{marginLeft:5}}></RiKakaoTalkFill>
    </KakaoShareButton>
  );
};


export default KakaoShareBtn;