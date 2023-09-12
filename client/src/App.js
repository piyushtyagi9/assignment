import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SideBar from './Components/SideBar';
import Dashboard from './Pages/Dashboard';
import Settings from './Pages/Setting';
import Reports from './Pages/Reports';
import EmpCreate from './Pages/EmpCreate';
import EmpEdit from './Pages/EmpEdit';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  let str1 = "Total Records"
  let str2 = "Total Pages"
  let str3 = "Per Page Count" 
  return (
    <BrowserRouter>

      <SideBar>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/setting" element={<Settings/>} />
          <Route path="/reports" element={<Reports/>} />
          <Route path='/employee/create' element={<EmpCreate />}></Route>
          <Route path='/employee/edit/:empid' element={<EmpEdit />}></Route>
        </Routes>
      </SideBar>
    </BrowserRouter>
  );
};

export default App;
