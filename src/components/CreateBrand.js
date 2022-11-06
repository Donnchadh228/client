import React,{useState} from 'react';
import {createBrand} from "../http/deviceAPI";


const CreateBrand = ()=> {
   const [value, setValue] = useState('')

    const addBrand = () => {
        createBrand({name: value}).then(data => {setValue('') })
    }


  return (
    <form className="form-create brand">
      <h2>Створення бренду</h2>
      <label htmlFor="brand">Введіть бренд:</label><input  value={value} onChange={e=>setValue(e.target.value)} type="text" id="brand"/>
      <button onClick = {addBrand}>Створити бренд</button>
    </form>
  
  );
};

export default CreateBrand

