import React,{useCallback,useEffect,useState,useContext} from "react";
import "./nav.css";
import "./App.css";
import { AppContext } from "./AppContext";
//import Invoice from "./Invoice";
import { useNavigate } from "react-router-dom";
//import DateTimePicker from "react-datetime-picker";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faFileCirclePlus } from '@fortawesome/free-duotone-svg-icons';



function Invoicelist(){
  const [filterValue, setFilterValue] = useState('');
    const [companys, setCompanys] = useState([]);
    const [m_FY_YEAR, setM_FY_YEAR] = useState([]);
    const{
        Companyvalue,
        setCompanyvalue,
        Fyearvalue,
        setFyearvalue
        
    
      } = useContext(AppContext)
     
     const company = Companyvalue;
     const FY_YEAR = Fyearvalue;
     const history = useNavigate();
    const fetchdata = useCallback(() => {
        // Fetch FY_YEAR data
       
    
        // Fetch company data
        try {
          fetch(`http://localhost:5163/api/InvoiceMain/Company?Company=${company}`)
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
      // <div className="Invoicelist">
      // <Invoice/>
      // </div>
      history("/Invoice");

     }
     const handleFilterChange = (event) => {
      setFilterValue(event.target.value.toUpperCase());
    };
  
    const filteredData = companys.filter((item) => {
      return item.customer_name.toUpperCase().includes(filterValue);
    });
    return(
               
                <div className="NavManu">
                <button className="_NavLink" onClick={handleClick}><img width="50" height="50" src="https://img.icons8.com/arcade/64/add-file.png" alt="ADD"/></button>
                <button className="_NavLink"><img width="50" height="50" src="https://img.icons8.com/arcade/64/edit-file.png" alt="EDIT"/></button>
                <button className="_NavLink"><img width="50" height="50" src="https://img.icons8.com/arcade/64/000000/view-file.png" alt="view"/></button>
                <button className="_NavLink"><img width="50" height="50" src="https://img.icons8.com/arcade/64/000000/delete-file.png" alt="delete"/></button>
                {/* <DateTimePicker format="dd-MM-yyyy" readOnly={tdue} /> */}
                
                <div className="fromdate" >
                {/* { */}
            {/* // companys.map((getfyear) => ( */}
             <input type="date"  />
           {/* // )) */}
          {/* } */}
                </div >
                <div className="To">
                <label>TO</label>
                </div>
                <div className="Todate">
                <input type="date"  />
                </div>       
                
               <div className="customer">
               <input className="_input" type="text" onChange={handleFilterChange} placeholder="Customer Name" />
               </div>          
               <div className="table">
        <table>
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Invoice Date</th>
              <th>Customer Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((getfyear, index) => (
              <tr key={index}>
                <td>{getfyear.invoice_no}</td>
                <td>{new Date(getfyear.invoice_Date).toLocaleDateString()}</td>
                <td>{getfyear.customer_name}</td>
                <td>{getfyear.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
               </div>
                
               
               
    )

}

export default Invoicelist;