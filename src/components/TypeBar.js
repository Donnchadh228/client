import React,{useContext} from 'react';
import {Context} from "../index"
import { observer } from "mobx-react-lite"
import {removeType} from "../http/deviceAPI.js"

const TypeBar = observer(()=> {
  const {device} = useContext(Context);
  const {user} = useContext(Context);
  return (

       <div className="device__where-block device__where-types dlfex">
          <div>Виберіть тип:</div>
          <div className="device__where-type dlfex">
         
            {device.types.map(type =>
                 <div className="dlfex"
                  active={String(type.id === device.selectedType.id)}
                  onClick={(e)=>{if(e.target.getAttribute('active')==='true'){ device.setSelectedTypeNone() }else device.setSelectedType(type)}}
                  key={type.id}
                  >
                 {type.name}
                 
                  {user.user.role ==="ADMIN"? <span onClick={(e)=>{
                    e.stopPropagation();
                    removeType(type.id);
                    e.target.offsetParent.remove(); 
                    }

                  }>  x</span>:""}
                 </div>
              )}
               
          </div>
        </div>
  );
});

export default TypeBar