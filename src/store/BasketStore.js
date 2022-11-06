import {makeAutoObservable} from 'mobx'

export default class BasketStore{
	constructor(){
		this._basketItem = []
		this._basketId = ""
		makeAutoObservable(this)
	}
	setbasketItem(basketItem){
		this._basketItem = basketItem
	} 
	setBasketId(basketId){
		this._basketId = basketId
	}
	get basketItem(){
		return this._basketItem
	}
	get basketId(){
		return this._basketId
	}

}