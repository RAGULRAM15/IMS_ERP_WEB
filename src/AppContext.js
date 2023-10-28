import {createContext} from "react";

const AppContext = createContext({});



export  {AppContext};

// const AppProvider = ({value}) => {
//     const[Companyvalue,setCompanyvalue] = useState(null);
//     const[Fyearvalue,setFyearvalue] = useState(null);

//     return (
//         <AppContext.Provider value={{Companyvalue,setCompanyvalue,Fyearvalue,setFyearvalue}}>
//             {value}
//         </AppContext.Provider>
//     );

// };