import React,{useState,useEffect} from 'react'
import {useAlert} from 'react-alert';
import axios from 'axios';
import {UserTable} from '../../Common';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default function SignUp(props) {
    
    let userId = window.localStorage.getItem("userId");
    const {isLoggedIn,role} = props.loginInfo;
    const alert = useAlert();
    const [state,setState]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        isAdmin:false,
        conPassword:"",
        userData:[]
    })

    const getUsers=()=>{
        axios.get(`https://cricketify-backend.herokuapp.com/api/users`)
        .then((result)=>{
            setState({...state,userData:result.data})
        })
        .catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        if(isLoggedIn&&role==="admin"){
            getUsers()
        }
    },[])

    const activateAccount=(userId)=>{
        confirmAlert({
            title: 'Confirm Action',
            message: 'Do you want to activate this user?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    axios.put('https://cricketify-backend.herokuapp.com/api/user/activate',{userId})
                    .then(result=>{
                        alert.show(result.data.message,{type:"success"})
                        getUsers();
                    })
                    .catch(err=>{
                        alert.show(err.response.data.message,{type:"error"})
                    })
                }
              },
              {
                label: 'No',
                onClick: () => {
                  //Do Nothing
                }
              }
            ]
          });
    }
    const disableAccount=(userId)=>{
        confirmAlert({
            title: 'Confirm Action',
            message: 'Do you want to disable this user?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    axios.put('https://cricketify-backend.herokuapp.com/api/user/disable',{userId})
                    .then(result=>{
                        alert.show(result.data.message,{type:"success"})
                        getUsers();
                    })
                    .catch(err=>{
                        alert.show(err.response.data.message,{type:"error"})
                    })
                }
              },
              {
                label: 'No',
                onClick: () => {
                  //Do Nothing
                }
              }
            ]
          });
    }
    const toggleSwitch=(e)=>{
        setState({...state,isAdmin:!state.isAdmin})
    }
    const handleChange=(e)=>{
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]:value})
    }
    const handleSignup=()=>{
        if(!userId){
            userId="";
        }
        const isActive=true;
        const {firstName,lastName,email,password,conPassword,isAdmin} = state;
        if(password===conPassword){
            axios.post('https://cricketify-backend.herokuapp.com/api/user/signup',
            {firstName,lastName,email,password,isAdmin,userId,isActive})
            .then(result=>{
                    console.log(result);
                    alert.show(result.data.message,{type:"success"})
                    if(isLoggedIn&&role==="admin"){
                        getUsers()
                    }
            })
            .catch(err=>{
                alert.show(err.response.data.message,{type:"error"})
            })
        }
        else{
            alert.show("Password mismatch",{type:"error"})
        }
    }
    return (
        <div className="container mb-2">
            <div className="row">
                <div className="col-12 col-md-12 col-lg-5 col-xl-5">
                <h1 className="main-heading">Signup</h1>
              <div className="formgroup">
                  <label htmlFor="firstName">First name</label>
                  <input 
                  type="text" 
                  name="firstName" 
                  onChange={handleChange} 
                  value={state.firstName}/>
              </div>
              
              <div className="formgroup">
                  <label htmlFor="lastName">Last name</label>
                  <input 
                  type="text" 
                  name="lastName" 
                  onChange={handleChange} 
                  value={state.lastName}/>
              </div>
              
              <div className="formgroup">
                  <label htmlFor="email">Email</label>
                  <input 
                  type="text" 
                  name="email" 
                  onChange={handleChange} 
                  value={state.email}/>
              </div>
              <div className="formgroup">
                  <label htmlFor="password">Password</label>
                  <input 
                  type="password" 
                  name="password"
                  onChange={handleChange} 
                  value={state.password}/>
              </div>
              <div className="formgroup">
                  <label htmlFor="conPassword">Confirm Password</label>
                  <input 
                  type="password" 
                  name="conPassword"
                  onChange={handleChange} 
                  value={state.conPassword}/>
              </div>
              <div className="formgroup">
                <label>Admin? </label>
              <label class="switch">
                <input type="checkbox"
                onChange={toggleSwitch}
                />
                <span class="slider round"></span>
            </label>
              
              </div>
              <button 
              className="btnprimary" 
              onClick={handleSignup}>{isLoggedIn?"Create User":"Signup"}</button>
                {
                    isLoggedIn?null:<a className="link-back" href="/">back to login</a>
                }
                </div>
                {
                    isLoggedIn?
                    <div className="col-12 col-md-12 col-lg-7 col-xl-7">
                         <h3 className="sub-heading">Users</h3>
                            {
                                state.userData.length?
                                <UserTable activateAccount={activateAccount} disableAccount={disableAccount} userInfo={state.userData}/>:
                                <p className="textInfo">No user to be shown for the admin</p>
                            }
                    </div>
                    :null
                }
            </div>
              
        </div>
    )
}
