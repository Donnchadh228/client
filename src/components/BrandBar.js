import React,{useContext} from 'react';
import {Context} from "../index"
import { observer } from "mobx-react-lite"
import {removeBrand} from "../http/deviceAPI.js"

const BrandBar = observer(()=> {
  const {device} = useContext(Context);
   const {user} = useContext(Context);
  return (
       <div className="device__where-block device__where-brands dlfex">
          <div>Виберіть бренд:</div>
          <div className="device__where-brand dlfex">
            {device.brands.map(brand =>
                 <div 
                  active={String(brand.id === device.selectedBrand.id)}
                className="dlfex"
                 onClick={(e) => {if(e.target.getAttribute('active')==='true'){ device.setSelectBrandNone() }else device.setSelectedBrand(brand);}}
                  key={brand.id}
                  >
                 {brand.name}
                 {user.user.role ==="ADMIN"? <span onClick={(e)=>{
                     e.stopPropagation();
                    removeBrand(brand.id);
                    e.target.offsetParent.remove();
                    }

                  }>  x</span>:""}
                 </div>
              )}
          </div>
        </div>
  );
});

export default BrandBar