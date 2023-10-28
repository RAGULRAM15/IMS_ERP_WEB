import React, { useContext, useEffect, useState } from "react";
//import Modal from "react-modal";
import "./file.css";
import { AppContext } from "./AppContext";
import AddItemModal from "./AddModel";
import Quotationlist from "./Quotationlist";

function Quotation() {
  const [Customer, setCustomer] = useState([]);
  const [Address, setAddress] = useState([]);
  const [items, setItems] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editItemIndex, setEditItemIndex] = useState(undefined);
  const [editItemValue, setEditItemValue] = useState("");
  const [close, setClose] = useState(false);
  const [customer_id, setCustomer_id] = useState(0);

  const openModal = (editIndex) => {
    const valueToEdit = items[editIndex];
    setEditItemValue(valueToEdit);
    setModalIsOpen(true);
    setEditItemIndex(editIndex);
    
    
  };

  const closeModal = () => {
    setModalIsOpen(false);
    calculateColumnSum();
    setEditItemIndex(undefined);
    
  };

  const addItem = (newItem) => {
    const newRowNo = items.length + 1;

    // Include Row No and Company in the new item
    const newItemWithInfo = {
      ...newItem,
      row_id: newRowNo,
      company_id: company,
    };

    
    setItems([...items, newItemWithInfo]);

    
    calculateColumnSum();
    customer_id_value();

    
   
  };

  const editItem = (index, newValue) => {
    const updatedItems = [...items];
    updatedItems[index] = {...newValue ,row_id: index +1, 
    company_id: company,};
    setItems(updatedItems);
    closeModal();
    calculateColumnSum();
   
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    calculateColumnSum();
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const { Uservalue, setUservalue, Companyvalue,
    setCompanyvalue, } = useContext(AppContext);
    useEffect(() => {
      const storedCompanyvalue = localStorage.getItem('Companyvalue');
      const storedUserValue = localStorage.getItem('Uservalue');
      if (storedCompanyvalue && storedUserValue) {
        setCompanyvalue(storedCompanyvalue);
        setUservalue(storedUserValue);
      }
    }, [setCompanyvalue, setUservalue]);
    const user = Uservalue;
     const company = Companyvalue;
     

  useEffect(() => {
    const fetchdata = () => {
      try {
        fetch("http://localhost:5163/api/Customer/Customer")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
              
            }
            
            return response.json();

          })
          .then((data) => setCustomer(data))
          .catch((error) => console.error("Error fetching data:", error));
      } catch (error) {
        console.error(error);
      }
    };

    fetchdata();
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const formattedDate = formatDate(currentDate);

  const handlechange = (event) => {
    
    console.log(event.target.value);
    try {
      fetch(
        `http://localhost:5163/api/Customer/CustomerName?CustomerName=${event.target.value}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => setAddress(data))
        .catch((error) => console.error("Error fetching data:", error));
    } catch (error) {
      console.error(error);
    }
    customer_id_value();
    console.log(customer_id);
  };
  
    const [columnSum, setColumnSum] = useState(0);
    const [columnSumtotal, setColumnSumtotal] = useState(0);
   
    const customer_id_value =() =>{
     Address.map((Name) => setCustomer_id(Name.customeR_ID));
     console.log(company);
      }
    const calculateColumnSum = () => {
     
      const sum = items.reduce((total, item) => {
        
       
        return total + parseInt(item.quantity,10) ;
      }, 0);
      setColumnSum(sum);
      const sum1 = items.reduce((total, item) => {
      
       
        return total + parseInt(item.total,10) ;
      }, 0);
      setColumnSumtotal(sum1);
      console.log("calculateColumnSum executed");

    };
    const handleSubmit = async(event) => {
    
    
      event.preventDefault();
     
    
        try{
         
          
         
          
          const url = `http://localhost:5163/api/QuotationMain/Insert`;
  
          
  
          const response = await fetch(url,{
            method:'post',
            headers:{
              'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
              "quotatioN_DATE": new Date(),
  "company_id": Companyvalue,
  "quantity_main": columnSum,
  "discount_main": 0,
  "total_main": columnSumtotal,
  "user_name": user,
  "customer_id": customer_id,
  "quotationItemValue": [...items] })
          });
    
          
             
        if( response.status === 200 )
        {
        
         
          // alert("Saved Successfully");
          if(close === false)
          {
            setClose(true);
          }
          else
          {
            setClose(true);
          }
         
          
  
          //  history('/FYear')
        
          
           
        }
       else  if (response.status === 204 || response.status === 400) {
         
            
        // setErrorMessages({ name: "uname", message: errors.uname });
        alert("Error Retrieving data");
            
          
        } else if(response.status === 404) {
          // setErrorMessages({ name: "pass", message: errors.pass })
          alert("Error Retrieving data");
          
        }
        
        else{
          alert("Error Retrieving data");
          // setErrorMessages('Error Retrieving data');
        }
        }
        catch(error){
          alert("Error Retrieving data");
          // console.log(error);
          // setErrorMessages({ name: "pass", message: errors.net });
          //setErrorMessages({ name: "uname", message: errors.net });
          
          //setErrorMessages('Error Retrieving data');
        }
      
      // const userData = await database.find((user) => user.username === uname.value);
  
      setClose(false);
     
    };
  
const handleclose =()=>{
  setClose(true)
}
  const render = (
    <div>
      <div className="TopSide">
        <div className="CustomerDetials">
          <input
            type="text"
            list="CustomerName"
            onChange={handlechange}
            placeholder="CustomerName"
            required
          />

          <datalist id="CustomerName" className="customerdrop">
            {Customer.map((Name, index) => (
              
              <option className="customerOption" key={index} value={Name.customer_Name}></option>
            ))}
          </datalist>

          {Address.map((Name, index) => (
            <textarea
              rows={1}
              cols={10}
              key={index}
              value={Name.address}
              placeholder="Address"
              readOnly
              required
            />
          ))}

<label>customeR_ID:{customer_id}</label>
<label>company_id:{company}</label>
        </div>
        
        <div className="userSide">
          <input type="text" value={formattedDate} readOnly required />

          <input type="text" placeholder="Quotation" readOnly />

          <input type="text" value={Uservalue} placeholder="User" readOnly required />
        </div>
      </div>
      <button className="Add" onClick={() => openModal()}>Add</button>
<AddItemModal
  isOpen={modalIsOpen}
  onClose={closeModal}
  addItem={addItem}
  editIndex={editItemIndex}
  initialValue={editItemValue}
  editItem={editItem}
  calculateColumnSum={calculateColumnSum} 
/>

      
      <div className="tablestyle" >
      
        <table id="mytable" >
          <thead>
            <tr>
              <th>Row No</th>
              <th>Item Name</th>
              <th>Size</th>
              <th>Style</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Discount</th>
              <th>Total</th>
              <th>Edit</th>
              <th>Delete</th>
              <th hidden>Item id</th>
              <th hidden>size id</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                 <td>{index + 1}</td>
                <td>{item.itemName}</td>
                <td>{item.size}</td>
                <td>{item.style}</td>
                <td>{item.quantity}</td>
                <td>{item.rate}</td>
                <td>{item.discount}</td>
                <td>{item.total}</td>
                <td>
                  <button onClick={() => openModal(index)}>Edit</button>
                </td>
                <td>
                <button onClick={() => deleteItem(index)}>Delete</button>
                </td>
                <td hidden>{item.item_id}</td>
                <td hidden>{item.size_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
     
      </div>
      <div className="FileTable">
        <lable className="lblQuantity">SumQuantity : {columnSum}</lable>
        
      
      <lable className="lblTotal">SumTotal : {columnSumtotal}</lable>
       
      </div>
      <div className="btnsave">
      
        <button className="Btnsave" onClick={handleSubmit}>Save</button>
      
      <button className="btnClose" onClick={handleclose}>Cancel</button>
    </div>
    </div>
  );
  return(
    <React.Fragment>
      <div>{close?<div><Quotationlist/></div>:<div>{render}</div>}</div>
    </React.Fragment>
  )
}


export default Quotation;








