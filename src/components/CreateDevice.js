import React,{useContext,useState,useEffect} from 'react';
import {Context} from "../index"
import {fetchTypes,fetchBrands,createDevice,createDevices} from "../http/deviceAPI.js"
import {observer} from "mobx-react-lite";

const CreateDevice = observer(()=> {
   const {device} = useContext(Context);
   const [name,setName] = useState('')
   const [price,setPrice] = useState(0)
   const [file,setFile] = useState(null)
   const [brand,setBrand] = useState(null)
   const [type,setType] = useState(null)
   const [info,setInfo] = useState([])
   
   let t_type = device.types[0];
   let b_brand = device.brands[0];
    useEffect(()=>{
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))

  },[])

  function changeBrand() {
    let selectBox = document.getElementById("device_brand");
    let selectedValue = selectBox.selectedIndex-1
    return device.setSelectedBrand( device.brands[selectedValue]);
   }
  function changeType() {
    let selectBox = document.getElementById("device_type");
    let selectedValue = selectBox.selectedIndex-1
    return device.setSelectedType(device.types[selectedValue]);
   }
   const addInfo = () =>{
    setInfo([...info,{title:"",description:"",number:Date.now()}])
   }
   const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

      const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData)
    }


   const removeInfo = (number) =>{
    setInfo(info.filter(i=>i.number !== number))
   }


   const selectFile = e => {
    setFile(e.target.files[0])
   }
  return (
          
  <form className="form-create device">
    <h2>Створення продукту</h2>
    <label htmlFor="brand">Введіть назву:</label><input value={name} onChange={e=>setName(e.target.value)} name="device_brand" type="text" id="brand"/>
    <label htmlFor="price">Введіть ціну:</label><input value={price} onChange={e=>setPrice(Number(e.target.value))} name="device_price" type="number" id="price"/>
    <label htmlFor="img">Виберіть фотографію:</label><input onChange={selectFile} name="device_img" type="file" accept="image/jpg" id="img"/>
    <label htmlFor="device_brand">Виберіть бренд:</label>
    <select onChange={changeBrand} name="device_brand" id="device_brand">
    <option value="0">---------------</option>
      {device.brands.map(brand=>
        <option value={brand.id}
         key ={brand.id} >{brand.name}</option>
        )}
    </select>
    <label htmlFor="device_type">Виберіть тип:</label>
    <select onChange={changeType} name="device_type" id="device_type">
    <option value="0">---------------</option>
      {device.types.map(type=>
        <option value={type.id}
         key ={type.id}>{type.name}</option>
        )}
    </select>
    <h3 onClick = { addInfo }>Додати опис</h3>
    {info.map(i=>
      <div key ={i.number} className="device__description dlfex">
          <input value={i.title}  onChange={(e) => changeInfo('title', e.target.value, i.number)} type="text" placeholder="Введіть назву"/> 
          <input value={i.description}  onChange={(e) => changeInfo('description', e.target.value, i.number)} type="text" placeholder="Введіть опис"/>
          <span onClick={()=> removeInfo(i.number)} className="device__descripti-delete">-</span>
      </div>
      )}
    <button onClick={addDevice}>Створити продукт</button>


  </form>
  );
});

export default CreateDevice

