import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'; // Create this file and add your custom styles
// import './scripts.js';

 
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RoughOne from './components/RoughOne';
import RoughTwo from './components/RoughTwo';
// import FetchRoles from './components/roles/useFetchRoles'
import CreateRole from './components/roles/CreateRole';
import CreateCluster from './components/clusters/CreateCluster';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <BrowserRouter>

    //   <Routes>
    //     <Route path="/" element={<App />}/>
    //     <Route path="/page1" element={<RoughOne />}/>
    //     <Route path="/page2" element={<CreateCluster />}/>

    //   </Routes>
        
    // </BrowserRouter>
    <App />

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
