
import styled from "styled-components";

export const Container = styled.div`
  margin-left:auto;
  margin-right:auto;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: white;
  flex-direction: column;
  /* justify-content:space-evenly; */
  
  /* position:relative; */
  @media (min-width: 800px) {
    width: 600px;
    height: 100vh;
    /* border-left:1px solid #95afc0;
    border-right:1px solid #95afc0; */
  }
`;

export const BgImg=styled.img`
    width:30%;
    height:40%;
`;


export const TopImage=styled.img`
    width:20%;
`;


export const Btn=styled.button`
   background-color:#0f3457;
   width:150px;
   padding:10px 10px;
   border-radius:10px;
   color:white;
   font-size:20px;
   font-weight:800;
   margin-top:50px;
`;

export const ImageContainer=styled.div`
  width: 80%;
  height: 25%;
  display:flex;
  background-color:rgba(0, 0, 0, 0.07);
  border-radius:10px;
  /* border:3px dashed #535c68; */
  justify-content:center;
  align-items:center;
  box-shadow: 0px 3px 20px 10px rgba(0, 0, 0, 0.10);
  flex-direction:column;
`;

export const TopStart=styled.h1`
  font-size:40px;
  font-weight:bolder;   
  color:#0f3457;
  margin-top:10%;
`;

export const ImageText=styled.h1`
  font-size:12px;
  font-weight:800;
  color:#979797;
  margin-top:30px;
  @media (min-width: 800px) {
        font-size:20px;
    }
`;

export const TopContainer=styled.div`
  width: 100%;
  background-color:#FED06E;
  padding:5px 5px;
  display:flex;
  align-items:center;
  justify-content:space-evenly;
  flex-direction:row;
  /* position:absolute;
  top:0 */
`;

export const TopTitle=styled.h1`
  font-size:20px;
  font-weight:bolder;   
  color:white;
  @media (min-width: 800px) {
        font-size:30px;
    }
`;

export const Title=styled(TopTitle)`
    color:#341f97;
    margin-top:10%;
`;

export const BottomContainer=styled.div`
  width: 100%;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  margin-top:10%;
  background-color:#EEEEEE;
  @media (min-width: 800px) {
    width: 100%;
    }
`;
export const BottomMainText=styled.h1`
      width:60%;
      font-size:15px;
      font-weight:bolder;   
      color:#0f3457;
      text-align: center;
      line-height: 1.64;
      @media (min-width: 800px) {
        font-size:25px;
    }
`;
export const BootomSubText=styled.h1`
     width:60%;
     font-size:10px;
     font-weight:bolder;   
     color:#979797;
     text-align: center;
     line-height: 1.64;
     @media (min-width: 800px) {
        font-size:15px;
    }
`;