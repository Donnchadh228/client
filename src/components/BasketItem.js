import React,{useContext,useEffect,useState} from 'react';
import '../css/basket.css'
import {Context} from "../index"
import {fetchBasket,findBasket,removeBasket} from "../http/basketAPI.js"
import {getWhere} from "../http/deviceAPI.js"
import {observer} from "mobx-react-lite";

const BasketItem = observer(()=> {
  const {user} = useContext(Context);
  const {basket} = useContext(Context);
  const {device} = useContext(Context);
  let array = []
  let arrayDevice =[]
    useEffect(()=>{
     const asyncFunc = async ()=>{
      await findBasket(user.user.id).then(data =>{ basket.setBasketId(data)})
      if( basket.basketId !== null){
        await fetchBasket(basket.basketId.id).then(data=>basket.setbasketItem(data))
       await basket.basketItem.map((i)=>{
         array.push(i.deviceId)
       })
       await getWhere([array]).then(data=>{device.setDevices(data);})
      }
     }
     asyncFunc()

  },[])

    let idBasket= basket.basketId===0?basket.basketId.id:''
  return (

      <div className="container">
      {device.devices.map((device)=>{
        arrayDevice[device.id] = device; 
      })}
      <div className="basket__items">
      {basket.basketItem.map((i)=>
        
        <div key={i.id} className="basket__item dlfex">
          <img src={process.env.REACT_APP_API_URL+ arrayDevice[i.deviceId].img} alt=""/>
          <div className="basket__item-block">
            <div className="basket__item-name">{arrayDevice[i.deviceId].name}</div>
            <div className="basket__item-price">{arrayDevice[i.deviceId].price}</div>

          </div>
          <div  onClick={(e)=>{removeBasket(i.id);e.target.offsetParent.remove()}}  className="basket__item-delete">X</div>
        </div>
      )}        
        </div>
    </div>
  );
});
 

export default BasketItem;
