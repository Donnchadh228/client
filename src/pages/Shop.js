import React,{useEffect,useContext} from 'react';
import '../css/shop.css'
// import {Context} from '../index.js'
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList.js'
import {observer} from "mobx-react-lite";
import {Context} from '../index'
import {fetchTypes,fetchBrands,fetchDevices} from "../http/deviceAPI.js"
import Pages from '../components/Pages.js'
  
const Shop = observer(()=> {
  const {device} = useContext(Context)
    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, 6).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 6).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType, device.selectedBrand,])

  return (
  <div className="device">
    <div className="container">
      <h2>Товари</h2>
      <div className="device__where">
        <TypeBar/>
        <BrandBar/>
      </div>
      <DeviceList/>
      <Pages/>
    </div>
  </div>
  );
});

export default Shop;

