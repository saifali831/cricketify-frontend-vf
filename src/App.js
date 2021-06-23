import "./App.css";
import {BrowserRouter as Router} from 'react-router-dom';
import React,{useState,useEffect} from "react";
import {Layout} from './components/Layout' 
import {transitions,positions,Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
function App() {

  


  const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_RIGHT,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE,
    types : {
      INFO: 'info',
      SUCCESS: 'success',
      ERROR: 'error'
    }
  }

  const [login,setLogin] = useState({
    userId:"",
    userName:"",
    isLoggedIn:false
  })
useEffect(()=>{
  if(window.localStorage.getItem('userId')){
    setLogin({
      userId:window.localStorage.getItem('userId'),
      userName:window.localStorage.getItem('userName'),
      isLoggedIn:true
    })
  }
  
},[])
  return (
    <Router>
    <AlertProvider template={AlertTemplate} {...options}>
      <Layout/>
    </AlertProvider>
    </Router>
  );
}

export default App;
