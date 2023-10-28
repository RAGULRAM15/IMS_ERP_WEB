import React,{useContext,useState,useEffect,useCallback} from "react";
import { Link } from "react-router-dom";
//import { useState } from "react";
import  "./nav.css";
//import {CompanyContext,FYearContext} from './FYear'
import { AppContext } from "./AppContext";
import Quotationlist from "./Quotationlist";
import Invoicelist from "./InvoiceList";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./sample.css"
import Logout from "./Logout";

// Put any other imports below so that CSS from your
// components takes precedence over default styles.
//import App from "./App";
//import "./App.css"
function Dashboard(){
    
   
//

    //const [isCententVisible,setContentVisible] = useState(false);
    // const handleClose = () =>{
    //     setContentVisible(!isCententVisible);
    // }
const history = useNavigate();
    const [m_FY_YEAR, setM_FY_YEAR] = useState([]);
    const [companys, setCompanys] = useState([]);
    const [ismenu, setMenu] = useState(false);
    
    const{
        Companyvalue,
        setCompanyvalue,
        Fyearvalue,
        setFyearvalue
    
      } = useContext(AppContext)
    //  const FY_YEAR = Fyearvalue;
    //  const company = Companyvalue;
    const storedCompanyvalue = localStorage.getItem('Companyvalue');
  const storedFyearvalue = localStorage.getItem('Fyearvalue');

  // Set context values based on local storage
  useEffect(() => {
    if (storedCompanyvalue && storedFyearvalue) {
      setCompanyvalue(storedCompanyvalue);
      setFyearvalue(storedFyearvalue);
    }
  }, [storedCompanyvalue, storedFyearvalue, setCompanyvalue, setFyearvalue]);
    const company = Companyvalue;
    const FY_YEAR = Fyearvalue;
     const fetchdata = useCallback(() => {
      // Fetch FY_YEAR data
      try {
        fetch(`http://localhost:5163/api/Fyear/FYEARID?FY_YEAR_ID=${FY_YEAR}`)
          .then(response => {
            if (response.ok === 400) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => setM_FY_YEAR(data))
          .catch(error => console.error('Error fetching data:', error));
      } catch (error) {
        console.error(error);
      }
  
      // Fetch company data
      try {
        fetch(`http://localhost:5163/api/Fyear/CompanyId?COMPANY_ID=${company}`)
          .then(response => {
            if (response.ok === 400) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => setCompanys(data))
          .catch(error => console.error('Error fetching data:', error));
      } catch (error) {
        console.error(error);
      }
    }, [FY_YEAR, company]);
     useEffect(() => {
      // Fetch data when the component mounts
      fetchdata();
    }, [fetchdata]);
    
  
   
      setCompanyvalue(company);
      setFyearvalue(FY_YEAR);
      const [isclicked3, setIsClicked3] = useState(true);
      const [isclicked, setIsClicked] = useState(false);

      // Function to handle the click event and toggle the middle section visibility
      const handleclick1 = () => {
        
        setIsClicked3(isclicked3);
        setIsClicked(!isclicked);
        
      };
      const [isclicked2, setIsClicked2] = useState(false);

      // Function to handle the click event and toggle the middle section visibility
      const handleclick2 = () => {
        setIsClicked3(!isclicked3);
        setIsClicked2(!isclicked2);
      };
      const click1 = () => {
        setIsClicked(false);
        setIsClicked2(false);
        setIsClicked3(true);
      };
      const menuclick = () => {
        
        setMenu(!ismenu);
      };


      const fclick = () =>{
        history('/FYear')

      }
      const [isOpen, setOpen] = useState(false);
      const handleLogout = () =>{
setOpen(true);
      }
      const onClose = () =>{
        setOpen(false);
              }
    return(
      <div>
      <header>
      <div>
          <div className="Nav">
              <div className="Bars">
                  <div className="NavManu">
                 <button className="menu_button" onClick={menuclick}>
                 <img width="32" height="32" src="https://img.icons8.com/fluency/48/menu--v1.png" alt="menu"/></button>
              {/* {isCententVisible && ( */}
              <div className="NavBtn" >
                  {/* <Link className="NavBtnLink"  to="/">Log out</Link> */}
                  <button  className="NavBtnLink" onClick={handleLogout}>Log out</button>
                  <Logout isOpen={isOpen} OnClose={onClose} />
              </div>
            
             <div className="cNavBtn" onClick={fclick}>
              {
          companys.map((getfyear,index) => (
           <label key={index} value={getfyear.companY_ID}>{getfyear.companY_NAME}</label>
          ))
        }
              </div>
             
              <div className="fNavBtn" onClick={fclick}>
                 
              {
          m_FY_YEAR.map((getfyear,index) => (
           <label key={index} value={getfyear.fY_YEAR_ID}>{getfyear.fY_YEAR}</label>
          ))
        }
                  </div>
                 
              </div>
              </div>
          </div>
         
          </div>
          </header>
          <div>
          {ismenu?
          <nav className='navigation'>
          <div class="d-lg-block  sidebar">
           
                <ul className="nav flex-column">
                    <li className="border-0 border-bottom rounded">
                    
                    <Link className="nav-link" onClick={click1}>HOME</Link>
                    </li>
                    <li className="border-0 border-bottom rounded">
                    <Link className="nav-link" onClick={handleclick1}>QUOTATION</Link>
                    </li>
                    <li className="border-0 border-bottom rounded">
                    <Link className="nav-link" onClick={handleclick2}>INVOICE</Link>
                    </li>
                </ul>
               </div>
        </nav>
         
        :<div className="body" ></div>
}
          </div>
          { ismenu?
          <div>
             
         {isclicked3?<div>
                       {isclicked?<div className="Quotationlist w-85 p-3"><Quotationlist/> </div> :<div className="marg"><div className="body"></div></div>}
                       </div>:
                       <div>
                       {isclicked2?<div className="Quotationlist"><Invoicelist/> </div> :<div className="marg"><div className="body"></div></div>}
                       </div>}
                       </div>:<div></div>
           
           } 
           <div>
           <footer>
           <div className="text-center p-3">
      © 2023 Copyright:
    <a className="text-blue " href="https://www.stagexports.com/">WWW.StagExports.Com</a>
  </div>
           </footer>
           </div>
            </div>
           
    );
}

export default Dashboard;

