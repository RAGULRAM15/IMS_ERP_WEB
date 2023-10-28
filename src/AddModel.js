import React,{useState,useEffect} from "react";
import Modal from "react-modal";
import "./file.css";

function AddItemModal({
    isOpen,
    onClose,
    addItem,
    editIndex,
    initialValue,
    editItem,
    calculateColumnSum,
  }) {
   
    const [itemName, setItemName] = useState(initialValue || "");
    const [size, setSize] = useState(initialValue || "");
    const [style, setStyle] = useState(initialValue || "");
    const [quantity, setQuantity] = useState(initialValue || "");
    const [rate, setRate] = useState(initialValue || "");
    const [discount, setDiscount] = useState(initialValue || "");
    const [total, setTotal] = useState(initialValue || "");
    const [item_id, setitemid] = useState(initialValue || "");
    const [size_id, setsizeid] = useState(initialValue || "");
  
    const handleSave = () => {
      const newItem = {
        itemName,
        size,
        style,
        quantity,
        rate,
        discount,
        total,
        item_id,
        size_id
      };
  
      if (editIndex !== undefined) {
        editItem(editIndex, newItem);
      } else {
        addItem(newItem);
      }
  
      // Clear input fields
      
      setItemName("");
      setSize("");
      setStyle("");
      setQuantity("");
      setRate("");
      setDiscount("");
      setTotal("");
      setitemid("");
      setsizeid("");
      onClose();
      calculateColumnSum();
    };
    const handlecancel = () =>{
    
      setItemName("");
      setSize("");
      setStyle("");
      setQuantity("");
      setRate("");
      setDiscount("");
      setTotal("");
      setitemid("");
      setsizeid("");
      onClose();
      calculateColumnSum();
    }
    const [item, setItem] = useState([]);
    const [Sizeitem, setSizeItem] = useState([]);
    const [Sizeitemid_value, setSizeItemid_value] = useState([]);
    // Update input values when the initialValue changes (for editing)
    const fetchdata = () => {
      try {
        fetch("http://localhost:5163/api/Item")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => setItem(data))
          .catch((error) => console.error("Error fetching data:", error));
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
     
  
      fetchdata();
      if (initialValue) {
       
        setItemName(initialValue.itemName || "");
        setSize(initialValue.size || "");
        setStyle(initialValue.style || "");
        setQuantity(initialValue.quantity || "");
        setRate(initialValue.rate || "");
        setDiscount(initialValue.discount || "");
        setTotal(initialValue.total || "");
      }
    }, [initialValue],[]);
  const handleTotal2 =(e)=>{
    setRate(e.target.value)
    setTotal(quantity*rate);
    item_id_value();
    size_value();
   
  }
  const handleTotal1 =(e)=>{
    setQuantity(e.target.value)
    
    setTotal(quantity*rate);
    item_id_value();
    size_value();
   
  }
  
    
  const item_id_value =() =>{
    Sizeitem.slice(Sizeitem.length -1).map((Name, index) => (setitemid(Name.iteM_ID)));
   
  }
  const size_value =() =>{
    Sizeitemid_value.slice(Sizeitemid_value.length -1).map((Name, index) => (setsizeid(Name.sizE_ID)));
  }
  const sizevalue = (e) => {
    try {
      fetch(`http://localhost:5163/api/Item/ITEMSIZE?item=${e}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => setSizeItem(data))
        .catch((error) => console.error("Error fetching data:", error));
    } catch (error) {
      console.error(error);
    }
  }
  const size_id_value = (e) =>{
    try {
      fetch(`http://localhost:5163/api/Item/Size?item=${e}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => setSizeItemid_value(data))
        .catch((error) => console.error("Error fetching data:", error));
    } catch (error) {
      console.error(error);
    }
    
};
  
  const handleTotal3 =(e)=>{
    setDiscount(e.target.value)
    
    setTotal((1-discount/100)*quantity*rate);
  }
  const handleitem =(e)=>{
    setItemName(e.target.value)
    
    sizevalue(e.target.value);
   item_id_value();
   
   
    
  }
  const handlesize =(e) =>{
    setSize(e.target.value)
    
    size_id_value(e.target.value);
    item_id_value();
    size_value();
  }
    return (
     
      <Modal isOpen={isOpen} onRequestClose={onClose} className="add-item">
        
        <h2>{editIndex !== undefined ? "Edit Item" : "Add Item"}</h2>
      
        <div className="isValue">
          
          <input type="text" list="item" value={itemName} onChange={handleitem} placeholder="Item Name" required />
          <datalist id="item">
            {item.map((Name, index) => (
              <option key={index} value={Name.iteM_NAME}></option>
            ))}
          </datalist>
        </div>
        <div className="isValue">
          
          <input type="text" list="size" value={size} onChange={handlesize} placeholder="Size" required/>
          <datalist id="size">
            {Sizeitem.map((Name, index) => (
              <option key={index}  value={Name.sizE_NAME}></option>
              
            ))}
          </datalist>
        </div>
        <div className="isValue">
          
          <input type="text" value={style} onChange={(e) => setStyle(e.target.value)} placeholder="Style" required/>
        </div>
        <div className="isValue">
          
          <input type="number" value={quantity} onChange={handleTotal1} placeholder="Quantity"  required/>
        </div>
        <div className="isValue">
          
          <input type="number" value={rate} onChange={handleTotal2} placeholder="Rate" required />
        </div>
        <div className="isValue">
         
          <input type="number" value={discount} onChange={handleTotal3} placeholder="Discount" required />
        </div>
        <div className="isValue">
         
          <input type="text" value={total} placeholder="Total" readOnly />
        </div>
        <div className="isValue">
       
              
        
         
       </div>
        <button onClick={handleSave}>
          {editIndex !== undefined ? "Save Changes" : "Save"}
        </button>
        <button onClick={handlecancel}>Cancel</button>
        
      </Modal>
      
    );
  }
  export default AddItemModal;