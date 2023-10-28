//import axios from "axios";
import  "./App.css"
import React,{useState ,useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom"; 
import { AppContext } from "./AppContext";
 //import Dashboard from "./dashboard";
  //  const CompanyContext  = createContext();
  //   const FYearContext  = createContext();
  function FYear()
{
    const [m_FY_YEAR, setM_FY_YEAR] = useState([]);
    const [companys, setCompanys] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectvaluecomp, setSelectioncomp] = useState('');
  const [selectvalueyear, setSelectionyear] = useState('');
  const{
    Companyvalue,
    setCompanyvalue,
    Fyearvalue,
    setFyearvalue

  } = useContext(AppContext);
  useEffect(() => {
    const fetchdata =  () =>{
      try{
       fetch('http://localhost:5163/api/Fyear')
      .then(response => {
        // Check if the response status is ok
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setM_FY_YEAR(data))
      .catch(error => console.error('Error fetching data:', error));
      // const fyear = await responce.JSON()
      // setM_FY_YEAR(await fyear);
    //  .then(data) => (setM_FY_YEAR( response.JSON()))
     }
      catch(error){
        console.error(error);
  
      }
      try{
         fetch('http://localhost:5163/api/Fyear/Company')
        .then(response => {
          // Check if the response status is ok
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => setCompanys(data))
        .catch(error => console.error('Error fetching data:', error));
      
          }
          catch(error){
            console.error(error);
    
          }
        };
    fetchdata();
   
  }, []);
  useEffect(() => {
    const storedCompanyvalue = localStorage.getItem('Companyvalue');
    const storedFyearvalue = localStorage.getItem('Fyearvalue');
    if (storedCompanyvalue && storedFyearvalue) {
      setCompanyvalue(storedCompanyvalue);
      setFyearvalue(storedFyearvalue);
    }
  }, [setCompanyvalue, setFyearvalue]);



const history = useNavigate();
  const company_value =(event)=>{
    setSelectioncomp(event.target.value);
    
  };
  
  const fyear_value =(event)=>{
    setSelectionyear(event.target.value);
    
  };
  
  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    setIsSubmitted(true);
    

    console.log("Selected Company:", Companyvalue);
    console.log("Selected Financial Year:", Fyearvalue);
    setCompanyvalue(selectvaluecomp);
    setFyearvalue(selectvalueyear)
    localStorage.setItem('Companyvalue', selectvaluecomp);
    localStorage.setItem('Fyearvalue', selectvalueyear);

    history('/Stag/Dashboard');
    setIsSubmitted(false)
    // 
  }
const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input_container">
          <label>Company Name </label>
          <label htmlFor="company"></label>
          <select type="text" name="company_name" id="company" className="_input" value={selectvaluecomp} onChange={company_value} required >
          <option value = "" disabled selected hidden ></option>
          {
            companys.map((getfyear,index) => (
             <option key={index} value={getfyear.companY_ID}>{getfyear.companY_NAME}</option>
            ))
          }
          
          </select>
         
        </div>
        <div className="input_container">
          <label>Finacial Year </label>
          <label htmlFor="FYear"></label>
          <select  name="fyear_select" id="FYear" value={selectvalueyear} className="_input" onChange={fyear_value} required >
          <option value = "" disabled selected hidden ></option>
          {
            m_FY_YEAR.map((getfyear,index) => (
             <option key={index} value={getfyear.fY_YEAR_ID}>{getfyear.fY_YEAR}</option>
            ))
          }
          
          </select>
         
        </div>
        <div className="button_container">
          <button type="submit" id="btnsubmit" className="btn btn-primary btn-lg" placeholder="Submit">{isSubmitted?<i className='fa fa-spinner fa-spin '></i>: <div>Submit</div>}</button>
          
        
        </div>
      </form>
     

         
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Year Selection </div>
       

       {renderForm}
      </div>
    </div>
  );
  }
 
 export default FYear;
//  // const company = await responce1.JSON()
//       // setCompanys(await company);
//  //CompanyContext.Provider._currentValue = selectvaluecomp;
//     //FYearContext.Provider._currentValue = selectvalueyear;
//   {/* {renderErrorMessage("company_name")} */}
//   {/* {renderErrorMessage("fyear_select")} */}
//     {/*<input type="submit" placeholder="Sub(mit"/> */}
//   {/* <CompanyContext.Provider value={selectvaluecomp}>
//         <FYearContext.Provider value={selectvalueyear}>
//           <Dashboard />
//         </FYearContext.Provider>
//       </CompanyContext.Provider> */}
//   // export {CompanyContext,FYearContext};
//     {/* { isSubmitted ?renderForm: <div>User is successfully logged in</div> }  */}
//        {/* <CompanyContext.Provider value={selectvaluecomp}>
//         <FYearContext.Provider value={selectvalueyear}>
//      // 
//         </FYearContext.Provider>
//       </CompanyContext.Provider> */}

  
