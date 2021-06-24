import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import bgImg from '../../../images/login-bg1.png'
import {types, useAlert} from 'react-alert'
export default function Login(props) {
    const alert = useAlert();
    const {setUser} = props;
    const ROLE={
        ADMIN:"admin",
        USER:"user"
    }
    const [login,setLogin]=useState({
        email:"",
        password:""
    })
    const handleLogin=()=>{
        const {email,password} = login;
        axios.post("https://cricketify-backend.herokuapp.com/api/user/login",
        {email,password})
        .then(result=>{
                const {_id,firstName,role,accessToken}=result.data;
                window.localStorage.setItem('userId',_id);
                window.localStorage.setItem('userName',firstName)
                window.localStorage.setItem('role',role);
                window.localStorage.setItem('accessToken',accessToken)
                console.log(window.localStorage.getItem('accessToken'))
                setUser({username:firstName,role:role,isLoggedIn:false})
                if(role===ROLE.ADMIN){
                    window.location.replace('/admin');
                }
                if(role===ROLE.USER){
                    window.location.replace('/home');
                }
            })
        .catch(err=>{
            alert.show(err.response.data.message,{type:"error"});
        })
    }
    const handleChange=(e)=>{
        const value = e.target.value;
        setLogin({
            ...login,
            [e.target.name]:value})
    }
    return (
        <div className="bg-ground">
             <div className="overlay"></div>
        <div className="container make-on-top pt-3">
            <div className="row">
                <div className="col-12 col-md-6 col-lg-6">
                    <h3 className="main-heading">Connecting people with interest in cricket</h3>
                    <p className="primary-text">Post stories, Chat with cricket nerds, explore fixtures and much more!</p>
                    <img src={bgImg} className="bg-img"/>
                </div>
                <div className="col-12 col-md-6 col-lg-6">
                <p className="primary-text">Already a member?</p>
              <h1 className="main-heading">Login</h1>
              <div className="formgroup">
                  <label htmlFor="email">Email</label>
                  <input 
                  type="text" 
                  name="email" 
                  onChange={handleChange} 
                  value={login.email}/>
              </div>
              <div className="formgroup">
                  <label htmlFor="password">Password</label>
                  <input 
                  type="password" 
                  name="password"
                  onChange={handleChange} 
                  value={login.password}/>
              </div>
              <button 
              className="btnprimary"
              onClick={handleLogin}
              >Login</button>
              <p className="primary-text">New here? <Link to="/signup">Register</Link></p>
            </div>
            
            </div>
           </div>
          
        </div>
    )
}
