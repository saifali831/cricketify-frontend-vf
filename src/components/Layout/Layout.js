import React,{useEffect,useState} from 'react'
import {HomePage} from '../User'
import {AdminHomePage} from '../Admin'
import {Login,Signup} from '../Registration'
import {Navbar,Footer,Timeline,ChatRoom} from '../Common';
import {ManagePosts} from '../ManagePosts';
import {Error} from '../Unauthorised'
import {Fixture} from '../Fixture'
import {Route} from 'react-router-dom';
export default function Layout() {

    const [user,setUser]=useState({
        userName:"",
        role:"",
        isLoggedIn:false
    })
    useEffect(()=>{
        if(window.localStorage.getItem('userId')){

          setUser({
            userName:window.localStorage.getItem('userName'),
            role:window.localStorage.getItem('role'),
            isLoggedIn:true
          })
        }
        
      },[])
    
    return (
        <React.Fragment>
        <Navbar loginInfo={user}/>
        <Route path="/" exact render={()=>user.isLoggedIn?(<HomePage/>):(<Login setUser={setUser}/>)}/>
        <Route path={user.isLoggedIn?"/manage-accounts":"/signup"} exact render={()=>(<Signup loginInfo={user}/>)}/>
        {
         user.isLoggedIn?[
        (<Route path="/manage-posts" exact render={()=>(<ManagePosts/>)}/>),
        (<Route path="/admin" exact render={()=>(<AdminHomePage/>)}/>),
        (<Route path="/timeline" exact render={()=>(<Timeline/>)}/>),
        (<Route path="/home" exact render={()=>(<HomePage/>)}/>),
        (<Route path="/chatroom" exact render={()=>(<ChatRoom/>)}/>),
        (<Route path="/fixture" exact render={()=>(<Fixture/>)}/>)
         ]:
          null
        }
        
        <Footer/>
        </React.Fragment>
    )
}
