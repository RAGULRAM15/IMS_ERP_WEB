import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import FYear from "./FYear";
import Dashboard from "./dashboard";
import Quotation from "./Quotation";
import { AppContext } from "./AppContext";
import Invoice from "./Invoice";

const Routing = () => {
  // const [Companyvalue, setCompanyvalue] = useState([]);
  // const [Fyearvalue, setFyearvalue] = useState([]);
  // const [Uservalue, setUservalue] = useState([]);
  const [Companyvalue, setCompanyvalue] = useState(localStorage.getItem('Companyvalue') || []);
  const [Fyearvalue, setFyearvalue] = useState(localStorage.getItem('Fyearvalue') || []);
  const [Uservalue, setUservalue] = useState([]);

  // Store context values in localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('Companyvalue', Companyvalue);
  }, [Companyvalue]);

  useEffect(() => {
    localStorage.setItem('Fyearvalue', Fyearvalue);
  }, [Fyearvalue]);


  return (
    <Router>
        <AppContext.Provider value={{ Companyvalue, setCompanyvalue, Fyearvalue, setFyearvalue,Uservalue,setUservalue }}>
      <Routes>
        
            <React.Fragment>
          <Route path ="/"  Component={App } />
          <Route path="/FYear" Component={FYear } />
          <Route path="/Stag/Dashboard" Component={Dashboard} />
          <Route path="/Quotation" Component={Quotation} />
          <Route path="/Invoice" Component={Invoice} />
          </React.Fragment>
        
      </Routes>
      </AppContext.Provider>
    </Router>
  );
};

export default Routing;
