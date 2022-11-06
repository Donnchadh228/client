import React,{useState,useContext} from 'react';
import '../css/registration_login.css';
import {useLocation,useNavigate } from "react-router-dom"
import {LOGIN_ROUTE,SHOP_ROUTE} from '../utils/consts';
import {registration,login} from '../http/userAPI.js'
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(()=> {
  const {user} = useContext(Context)
  const location = useLocation();
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email,setEmail] = useState('')
  const [error,setError] = useState('')
  const [password,setPassword] = useState('')
  var errorMessage;

  const click = async () =>{
       try{
        let data;
        if(isLogin){
            data = await login(email,password)
           
        }else{
            data = await registration(email,password)
        }
        user.setUser(data)
        user.setIsAuth(true)
        navigate(SHOP_ROUTE)
       }catch(e){
         errorMessage = e.response.data.message;
         setError(errorMessage)
       }

  }

  return (

     <form className="reg_auth">
     <h2>{isLogin? "Вхід":"Реєстрація"}</h2>
      <div className="reg_auth-email dlfex"><div>email</div>
       <input value={email} onChange={e=> setEmail(e.target.value)} placeholder="Введіть email" type="text"/>
      </div>
      <div className="reg_auth-password dlfex"><div>password</div>
       <input value={password} onChange={e=> setPassword(e.target.value)} placeholder="Введіть пароль" type="password"/>
      </div>
      <div className="reg_auth-error">{ error}</div>
      <div className="reg_auth-button">
      <button type="button" onClick={click}>{isLogin? "Увійти":"Зареєструватись"}</button>
      </div>
    </form>
  );
});

export default Auth;

