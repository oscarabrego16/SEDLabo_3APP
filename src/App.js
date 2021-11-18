import React, { useState } from "react";
import './App.css';
import Axios from 'axios';

function App() {
  const [productName, setProductName]= useState("");
  const [productQuantity, setProductQuantity]=useState(0);

  const addToList=()=>{
    Axios.post("http://localhost:3000/insert",{productName:prodddductName,productQuantity:productQuantity});
  }
  return (
    <div className="App">
    <h1>CRUD de la BD pizzeria</h1>
    <label>Nombre del producto:</label>
    <input type="text" onChange={(event)=>{setProductName(event.target.value)}}/>
    <label>Cantidad del producto</label>
    <input type="number"  onChange={(event)=>{setProductQuantity(event.target.value)}}/>
    <button onClick={addToList}>AGREGAR</button>
    </div>
  );
}

export default App;
