import React,  { useState } from "react";
import Button from '@material-ui/core/Button';
import './Header.css'
import "../../assets/logo.svg"
import LoginRegister from "../loginModal/LoginRegister";

const Header = ()=> {

    const [isLoggedIn, setisLoggedIn] = useState(true);

  return (
    <div id="header_component">
        <img id="logoImage" alt="logo" src={require("../../assets/logo.svg")} ></img>
        <div id="login_button">
        {isLoggedIn ?
        <div>
            <Button className ="logged_in_BookShow" variant="contained" color="primary">Book Show</Button>
            <Button className ="logged_in" variant="contained" color="default">Logout</Button>
            </div>
            :
            <Button  variant="contained" color="default">Login</Button>} 
        </div>
        
        <LoginRegister/>
        
      
    </div>
  );

  }
export default Header;
