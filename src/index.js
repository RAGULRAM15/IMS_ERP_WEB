import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';




import Routing from './routing';
//import { AppProvider } from './AppContext';


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
    <React.StrictMode>
    
     <Routing />
   
</React.StrictMode>);



// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <AppProvider>
//     <Routing />
//     </AppProvider>
//   </React.StrictMode>
// );


