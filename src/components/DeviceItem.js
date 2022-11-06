import React,{useContext,useEffect} from 'react';
import { useNavigate  } from "react-router-dom"
import {DEVICE_ROUTE} from '../utils/consts'
import {Context} from "../index"
import {addBasket,findBasket} from "../http/basketAPI.js";

const DeviceItem = ({device})=> {
   const {user} = useContext(Context);
   const {basket} = useContext(Context);
  const navigate = useNavigate()


 useEffect(()=>{
   findBasket(user.user.id).then(data=>basket.setBasketId(data))
  },[])

  return (

            <div className="dlfex cur-p" onClick={(e)=>navigate(DEVICE_ROUTE+ '\/'+ device.id)} >
              <img src={process.env.REACT_APP_API_URL+device.img} alt=""/>
              <div className="device__item-block">
                <div className="device__item-name">{device.name}</div>
                <div className="device__item-price">{device.price} UAH</div>
                <div onClick={(e)=>{addBasket(basket.basketId.id,device.id);e.stopPropagation();console.log("Додано")}} className="device__item-basket">В корзину</div>
              </div>

            </div>
           
  );
};

export default DeviceItem


