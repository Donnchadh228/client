import React,{useState} from 'react';
import {createType} from "../http/deviceAPI";

const CreateType = ()=> {
  const [value,setValue] = useState('')

  const addType = ()=>{
   createType({name: value}).then(data => {      setValue('')    })
  }
  return (
    <form className="form-create type" action="">
      <h2>Створення типу</h2>
      <label htmlFor="type">Введіть тип:</label><input value={value} onChange={e=>setValue(e.target.value)} type="text" id="type"/>
      <button onClick = {addType}>Створити тип</button>
    </form>
  );
};

export default CreateType

