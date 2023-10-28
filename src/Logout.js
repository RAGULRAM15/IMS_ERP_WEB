import React,{useState,useEffect} from "react";
import Modal from "react-modal";
import image from "./image/avatar 2.jpg";
import "./file.css";

function Logout({isOpen,OnClose}){
    const [file,setFile] = useState(null);
    const [isValue,setValue] = useState(false);
    useEffect(() =>{
        if(isValue === false){
            const objectUrl = image;
        setFile(objectUrl)
        }
    },[])
    const handleImage = (e) =>{
setValue(true)
if(isValue){
    const objectUrl = URL.createObjectURL(e.target.files[0])
setFile(objectUrl)
}
    }
return(
    <Modal isOpen={isOpen} onRequestClose={OnClose} className="add-item">
<div>
    
    <input type="file" onChange={handleImage}/>
    <img className="imageProfile" src={file} />
    
</div>
</Modal>
);
}
export default  Logout;