import React,{useContext} from 'react';
import '../css/admin.css'
import CreateBrand from '../components/CreateBrand'
import CreateType from '../components/CreateType'
import CreateDevice from '../components/CreateDevice'
import {Context} from "../index";
import {SHOP_ROUTE} from '../utils/consts';

const Admin = ()=> {
  const {user} = useContext(Context)
  return (
  <div>
   {user.user.role === "ADMIN" ? 
    <div>
       
         <div className="dlfex">
         
        <CreateBrand />
        <CreateType />
       </div>
   
        <CreateDevice />
      </div>
     : <div>У вас немає доступу до адмін панелі</div>
   
     
     
    
  }
</div>
  );
};

export default Admin;

