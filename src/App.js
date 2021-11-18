import React, { useState,useEffect } from "react";
import './App.css';
import Axios from 'axios';

function App() {
  const [productName, setProductName]= useState("");
  const [productQuantity, setProductQuantity]=useState(0);

  const [newProductName,setNewProductName]=useState("");

const [productList, setproductList]= useState([]);

  //obtenemos la informacion de la bd una vez
  useEffect(()=>{
    Axios.get("http://localhost:3000/read").then((response)=>{
      setproductList(response.data);
    })
  },[]);

  const addToDB=()=>{
    Axios.post("http://localhost:3000/insert",{productName:productName,productQuantity:productQuantity});
    
    Axios.get("http://localhost:3000/read").then((response)=>{
      setproductList(response.data);
    })
  };

  const updateProduct=(id)=>{
    Axios.put("http://localhost:3000/update",{id:id, newProductName:newProductName});
    
    Axios.get("http://localhost:3000/read").then((response)=>{
      setproductList(response.data);
    })
  };
  const deleteProduct=(id)=>{
    Axios.delete(`http://localhost:3000/delete/${id}`);
    
    Axios.get("http://localhost:3000/read").then((response)=>{
      setproductList(response.data);
    })
  };

  return (
    <div className="App">
    <h1>CRUD de la BD pizzeria</h1>
    <label>Nombre del producto:</label>
    <input type="text" onChange={(event)=>{setProductName(event.target.value)}}/>
    <label>Cantidad del producto</label>
    <input type="number"  onChange={(event)=>{setProductQuantity(event.target.value)}}/>
    <button onClick={addToDB}>AGREGAR</button>

    <h1>Productos en BD</h1>
    {productList.map((val,key)=>{
      return(
      <div key={key}>
        <h1>{val.productName}</h1>
        <h1>{val.productQuantity}</h1>
        <input type="text" placeholder="Nuevo nombre"
        onChange={(event)=>{setNewProductName(event.target.value)}}/>
        <button onClick={()=>updateProduct(val._id)}>ACTUALIZAR</button>
        <button onClick={()=>deleteProduct(val._id)}>ELIMINAR</button>
        </div>
        );
    })}
    </div>
  );
}

export default App;
