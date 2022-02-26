import React,{useState,useEffect} from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Main from './pages/Main';
import Loading from './pages/Loading';


function App() {
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },500)
  },[])

  if(loading){
    return(
      <Loading></Loading>
    )
  }


  return (
    <Routes>
      <Route exact path="/" element={<Home></Home>}/>
      <Route path="/main" element={<Main></Main>}/>
    </Routes>
  );
}




export default App;