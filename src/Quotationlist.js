import React,{useCallback,useEffect,useState,useContext} from "react";
import "./nav.css";
import "./App.css";
import { AppContext } from "./AppContext";
import Quotation from "./Quotation";
//import { useNavigate } from "react-router-dom";
//import { DatePickerType } from "antd/es/date-picker";
//import DateTimePicker from "react-datetime-picker";
import DatePicker from 'react-datepicker';  
// import addDays from 'date-fns/addDays'  
//import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
  
 

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faFileCirclePlus } from '@fortawesome/free-duotone-svg-icons';


function Quotationlist(){
  const [filterValue, setFilterValue] = useState('');
    const [companys, setCompanys] = useState([]);
    const [m_FY_YEAR, setM_FY_YEAR] = useState([]);
    // const [startDate, setStartDate] = useState(new Date());  
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
     const [checkstartDate, setCheckStartDate] = useState(false);
     const [checkEndDate, setCheckEndDate] = useState(false);
     const [AddQutotation, setAddQuotation] = useState(false);

     const {
      Companyvalue,
      setCompanyvalue,
      Fyearvalue,
      setFyearvalue
    } = useContext(AppContext);
  
    // Retrieve values from local storage
    useEffect(() => {
      const storedCompanyvalue = localStorage.getItem('Companyvalue');
      const storedFyearvalue = localStorage.getItem('Fyearvalue');
      if (storedCompanyvalue && storedFyearvalue) {
        setCompanyvalue(storedCompanyvalue);
        setFyearvalue(storedFyearvalue);
      }
    }, [setCompanyvalue, setFyearvalue]);
  
  
     const company = Companyvalue;
     const FY_YEAR = Fyearvalue;
     //const history = useNavigate();
    const fetchdata = useCallback(() => {
        // Fetch FY_YEAR data
       
    
        // Fetch company data
        try {
          fetch(`http://localhost:5163/api/QuotationMain/Company?Company=${company}`)
            .then(response => {
              if (response.ok === 404) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => setCompanys(data))
            .catch(error => console.error('Error fetching data:', error));
        } catch (error) {
          console.error(error);
        }
        try{
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
      
      }, [company,FY_YEAR]);
       useEffect(() => {
        // Fetch data when the component mounts
        fetchdata();
      }, [fetchdata]);

     const  handleClick =()=>{
      // <div className="Quotationlist">
      // <Quotation/>
      // </div>
      setAddQuotation(true);

     }
     const handleStartDateChange = date => {
      setStartDate(date);
      setCheckStartDate(true);
      
      // companys.filter((item) => {
      //   const fromDate = new Date(item.froM_DATE);
      
      //   return startDate && fromDate > startDate.includes(filterValue);
      // })
      // filteredData()
    };
  
    const handleEndDateChange = date => {
      setEndDate(date);
      setCheckEndDate(true);
      // filteredData()
    };
    const handleRefresh = () => {
      setCheckStartDate(false);
      setCheckEndDate(false);
      setFilterValue();
    };
     const handleFilterChange = (event) => {
      setFilterValue(event.target.value.toUpperCase());
    };
  
    
    const filteredData = companys.filter((item) => {
      const customerName = item.customer_name.toUpperCase();
      
      
      if (filterValue && !customerName.includes(filterValue)) {
        return false;
      }
  
      
      const fromDate = new Date(item.froM_DATE);
      const toDate = new Date(item.tO_DATE);
      if (
        (startDate && fromDate < startDate) ||
        (endDate && toDate > endDate)
      ) {
        return false;
      }
  
      return true; 
    });
  
  
    
    const renderForm =(
               
                <div className="NavManu">
                  <div className="menuBtn">
                <button className="_NavLink" onClick={handleClick}><img width="50" height="50" src="https://img.icons8.com/arcade/64/add-file.png" alt="ADD"/></button>
                <button className="_NavLink"><img width="50" height="50" src="https://img.icons8.com/arcade/64/edit-file.png" alt="EDIT"/></button>
                <button className="_NavLink"><img width="50" height="50" src="https://img.icons8.com/arcade/64/000000/view-file.png" alt="view"/></button>
                <button className="_NavLink"><img width="50" height="50" src="https://img.icons8.com/arcade/64/000000/delete-file.png" alt="delete"/></button>
                {/* <DateTimePicker format="dd-MM-yyyy" readOnly={tdue} /> */}
                </div>
                <div className="fromdate " >
                {
            m_FY_YEAR.map((getfyear,index) => (
            
          <DatePicker  className=" w-50 p-1" 
             key={{index}} 
             selected={ checkstartDate? startDate : new Date(getfyear.froM_DATE) } 
                
               
              
              dateFormat="MM/dd/yyyy"  
              
              maxDate={new Date()}
              onChange={handleStartDateChange}  
          /> 
         
          
            ))}
          
        
               
                <label>TO</label>
                
               
                
                {
            m_FY_YEAR.map((getfyear,index) => (
            
          <DatePicker  className=" w-50 p-1" 
             key={{index}} 
             selected={checkEndDate? endDate :  new Date(getfyear.tO_DATE) } 
                
               
              
              dateFormat="MM/dd/yyyy"  
               
              maxDate={new Date()}  
              
               onChange={handleEndDateChange}


          /> 
            
          
            ))}
                </div>       
                
               <div className="customer">
               <input className="_input" id="Customer" type="text" onChange={handleFilterChange} placeholder="Customer Name" />
               <button onClick={handleRefresh}  ><img width="48" height="48" src="https://img.icons8.com/3d-fluency/94/restart--v1.png" alt="restart--v1"/></button>  
               </div> 
                     
               <div className="table">
        <table id="mytable" >
          <thead>
            <tr>
              <th>Quotation No</th>
              <th>Quotation Date</th>
              <th>Customer Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((getfyear, index) => (
              <tr key={index}>
                <td>{getfyear.quotatioN_NO}</td>
                <td>{new Date(getfyear.quotatioN_DATE).toLocaleDateString()}</td>
                <td>{getfyear.customer_name}</td>
                <td>{getfyear.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
               </div>
                
               
               
    )

    return(
      <React.Fragment>
{AddQutotation?<div><Quotation/></div>:<div >{renderForm}</div>}
      </React.Fragment>
    )

}

export default Quotationlist;