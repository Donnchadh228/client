import {$authHost} from './index'

export const addBasket = async (basketId,deviceId) => {
    const {data} = await $authHost.get('api/basket/add',{params:{
		basketId,deviceId
	}})
    return data
}
export const fetchBasket = async (id)=>{
	const {data} = await $authHost.get('api/basket/'+'?basketId='+id)
	return data
}

export const findBasket = async (id)=>{
	const {data} = await $authHost.get('api/basket/find/'+'?userId='+id)
	return data
}

export const removeBasket = async (id)=>{
	const {data} = await $authHost.get('api/basket/remove'+'/?id='+id)
	return data
}