import React, { useContext, useState,useEffect } from "react";

 
import { useNavigate } from "react-router-dom"
import { AppContext } from "./AppContext";
import "./App.css"



  
  
function App() {

  
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCheck,setCheck]= useState(false);
  const [USER_NAME, setUsername] = useState('');
  const [PASSWORD, setPassword] = useState('');
  // const User = useRef();

  const{
    Uservalue,setUservalue

  } = useContext(AppContext);
  useEffect(() => {
    const storedUserValue = localStorage.getItem('Uservalue');
    if (storedUserValue) {
      setUservalue(storedUserValue);
    }
  }, [setUservalue]);


  const errors = {
    uname: "invalid username",
    pass: "invalid password",
    net:"Network error"
  };
const history = useNavigate();
  const handleSubmit = async(event) => {
    
    
    event.preventDefault();
    setIsSubmitted(true);
  
      try{
       
        
       
        
        const url = `http://localhost:5163/api/Login/USER_NAME`;

        

        const response = await fetch(url,{
          method:'post',
          headers:{
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify({USER_NAME,PASSWORD})
        });
  
        
           
      if( response.status === 200 )
      {
                 
        // User= Uservalue;
        localStorage.setItem('Uservalue', USER_NAME);
       const values= localStorage.getItem('Uservalue')

        setUservalue(USER_NAME);
        console.log(values);
        

         history('/FYear')
      
        
         
      }
     else  if (response.status === 204 || response.status === 400) {
       
          
      setErrorMessages({ name: "uname", message: errors.uname });
        
          
        
      } else if(response.status === 404) {
        setErrorMessages({ name: "pass", message: errors.pass })
        
        
      }
      
      else{
        
        setErrorMessages('Error Retrieving data');
      }
      }
      catch(error){
        console.log(error);
        setErrorMessages({ name: "pass", message: errors.net });
        //setErrorMessages({ name: "uname", message: errors.net });
        
        //setErrorMessages('Error Retrieving data');
      }
    
    // const userData = await database.find((user) => user.username === uname.value);

    setIsSubmitted(false);
   
  };
 
    
    // const output = () =>{
    //   if(isSubmitted === false) {
    //     return  <div> <Link to="./FYear.js" ></Link> </div>;
    //   }
    //   else{
    //     return renderForm     

    //   }

    // }

   
  const checkpass = () =>{
     setCheck(!isCheck);
  }
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input_container">
          <label>Username </label>
          <input className="_input" type="text" name="uname" onChange={(e) => setUsername(e.target.value)} required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input_container">
          <label>Password </label>
          <input className="_input" type={isCheck ? "text" : "password"} name="pass" onChange={(e) => setPassword(e.target.value)}  required />
          
          {/* <input type="checkbox" className="eye" onChange={checkpass} />Show Password */}
          
          <span toggle="#password-field" onClick={checkpass} className={isCheck?"fa fa-fw fa-eye field-icon toggle-password":"fa fa-fw fa-eye-slash field-icon  toggle-password"}></span>
          <p></p>
          {renderErrorMessage("pass")}
        </div>
        <div className="button_container">
          <button type="submit" className="btn btn-primary btn-lg" id={isSubmitted?"nextsubmit":"btnsubmit"} onClick={handleSubmit} placeholder="submit">{isSubmitted?<i className='spinner-border  ' id="spinner"></i>: <div>Log In</div>}</button>
          
           {/*<input type="submit" placeholder="Sub(mit"/> */}
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
     
      <div className="login-form">
        <div className="title">Sign In</div>
        { renderForm}
      </div>
    </div>

  );
}

export default App;
