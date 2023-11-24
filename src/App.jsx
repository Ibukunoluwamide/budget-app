import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import BudgetApp from "./components/BudgetApp";
import 'bootstrap/dist/js/bootstrap.bundle.js'

const App = () => {
  return(
  <>
  <Routes>
    <Route path="/" element={<BudgetApp/>}/>
    <Route path="/:id" element={<BudgetApp/>}/>
  </Routes>
  <ToastContainer />
  
  </>

  )
};

export default App;
