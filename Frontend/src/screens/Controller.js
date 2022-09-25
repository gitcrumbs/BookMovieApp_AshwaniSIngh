import React, { useState } from "react";
import Home from "../screens/home/Home";
import Details from "../screens/details/Details";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BookShow from "../screens/bookshow/BookShow";
import Confirmation from "../screens/confirmation/Confirmation";
import Header from '../common/header/Header'






const Controller = () => {
  //base url for hosting from the proxy
  const baseUrl = "/api/v1/";  
   
  return (

    //Router used for routing the users based on the user actions on the screen

    <Router>
      <div className="main-container"> 
      <Header/>  
      
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} baseUrl={baseUrl} />}
        />
        <Route
          path="/movie-details/:id"
          render={(props) => <Details {...props} baseUrl={baseUrl} />}
          
        />
        <Route
          path="/bookshow/:id"
          render={(props) => <BookShow {...props} baseUrl={baseUrl} />}
        />
        <Route
          path="/confirm/:id"
          render={(props) => <Confirmation {...props} baseUrl={baseUrl} />}
        />
      </div>
    </Router>
  );
};

export default Controller;
