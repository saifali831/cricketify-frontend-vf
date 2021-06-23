import React from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Navbar = (props) => {

  const {isLoggedIn,userName,role} = props.loginInfo;
  
  const logout=()=>{
    confirmAlert({
      title: 'Confirm Logout',
      message: 'Do you want to logout?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            window.localStorage.removeItem('userId');
            window.localStorage.removeItem('userName');
            window.localStorage.removeItem('role');
            window.location.replace('/');
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
    // if (window.confirm('Do you want to logout?')) {
    //   window.localStorage.removeItem('userId');
    //   window.localStorage.removeItem('userName');
    //   window.localStorage.removeItem('role');
    //   window.location.replace('/');
    // } else {
    // }
    
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-blue">
      <div className="container">
        <a className="navbarbrand" href={(role==="admin")?"/admin":"/home"}>
          Cricketify
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
        icon
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
          {
            role==="admin"?
            [
            (isLoggedIn?(<li className="nav-item">
            <a href="/manage-accounts" className="navLink">Manage Accounts</a>
            </li>):null),(isLoggedIn?(<li className="nav-item">
            <a href="/manage-posts" className="navLink">Manage Posts</a>
            </li>):null)]:
            [
            (  
            isLoggedIn?(<li className="nav-item">
              <a href="/chatroom" className="navLink">Chat Room</a>
              </li>):null
            ),
            (
            isLoggedIn?(<li className="nav-item">
              <a href="/timeline" className="navLink">Timeline</a>
              </li>):null
            ),
            (
              isLoggedIn?(<li className="nav-item">
              <a href="/fixture" className="navLink">fixtures</a>
              </li>):null
            )
            ]
          }
            {
              isLoggedIn?(<li className="nav-item m-2">
              <p className="main-text p-nav">Welcome <span>{userName}</span>!</p>
            </li>):null
            }
            {isLoggedIn?(<li className="nav-item"><button className="btnDanger" onClick={logout}>logout</button></li>):
            null
              }
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
