import React,{useContext} from 'react';
import {Context} from "../index"
import { observer } from "mobx-react-lite"
import DeviceItem from "./DeviceItem.js"
import {removeDevice} from "../http/deviceAPI.js"

const DeviceList = observer(()=> {

    const {user} = useContext(Context);
  const {device} = useContext(Context);


  return (
    <div className="device__items">
             
              {device.devices.map(device=>
                 <div key={device.id} className="device__item">
                  {user.user.role === "ADMIN"? <div onClick={(e)=>{
                    removeDevice(device.id);
                    
                     }
                  } className="device__delete">x</div>:""}
                <DeviceItem  device={device}/>
                </div>
              )}
         
          </div>
       
  );
});

export default DeviceList