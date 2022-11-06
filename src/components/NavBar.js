import React,{useContext} from 'react';
import {Context} from "../index"
import '../css/header.css';
import {NavLink} from 'react-router-dom';
import {SHOP_ROUTE,LOGIN_ROUTE,REGISTRATION_ROUTE,BASKET_ROUTE,ADMIN_ROUTE} from '../utils/consts';
import { observer } from "mobx-react-lite"
import jwt_decode from 'jwt-decode'
const NavBar = observer(()=>{

	const {user} = useContext(Context);
	const logOut = () =>{
		user.setUser({})
		user.setIsAuth(false)
	}
	return (
		<header>
		<div className="header__top">
			<div className="container dlfex jst_bet">
				<NavLink className="logo" to={SHOP_ROUTE}><h1><span>PC</span>Shop</h1></NavLink>
				<div className="header__nav">
					<nav className="">
					{user.isAuth ?
						<ul>
							<li><NavLink to={SHOP_ROUTE}>Товари</NavLink></li>
							<li><NavLink to={BASKET_ROUTE}> Корзина</NavLink></li>
							<li><NavLink onClick={logOut} to={LOGIN_ROUTE}>Вихід</NavLink></li>
							{user.user.role === "ADMIN"? 
							<li><NavLink to={ADMIN_ROUTE}>Адмін панель</NavLink></li>
							:""}
						</ul>
						:
						<ul>
							<li><NavLink to={SHOP_ROUTE}>Товари</NavLink></li>
							<li><NavLink to={LOGIN_ROUTE}>Авторизація</NavLink></li>
							<li><NavLink to={REGISTRATION_ROUTE}>Регістрація</NavLink></li>
						</ul>
					}
					</nav>
				</div>
			</div>			
		</div>
	</header>

	)
});

export default NavBar;
