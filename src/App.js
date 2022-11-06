import React,{useContext,useState,useEffect } from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter.js";
import NavBar from './components/NavBar'
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from './http/userAPI'

const App = observer(()=> {
  const {user} = useContext(Context)
  const [loading,setLoading] = useState(true)
 useEffect(() => {
        check().then(data => {
            user.setUser(data)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [])

  if(loading){

  }

  return (
      <BrowserRouter>
      <NavBar />
       <AppRouter />
      </BrowserRouter>
  );
});

export default App;
