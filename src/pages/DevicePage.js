import React,{useState,useEffect} from 'react';
import '../css/item.css'
import {useParams} from 'react-router-dom'
import {fetchOneDevices} from '../http/deviceAPI'


const DevicePage = ()=> {
     const [device, setDevice] = useState({info: []})
    const {id} = useParams()
    useEffect(() => {
        fetchOneDevices(id).then(data => setDevice(data))
    }, [])



  return (
      <div className="item">
    <div className="container">
      <div className="item__block">
        <div className="dlfex">
           <img src={process.env.REACT_APP_API_URL+device.img} alt="asd"/>   
          <div>
            <div className="item__block-name">{device.name}</div>
            <div className="item__block-price">{device.price} UAH</div>
          </div>
        </div>
        <div className="item__block-desc">
            {device.info.map((info,index)=>

              <div key={info.id}>{info.title} : {info.description}</div>
            )}
          </div>

      </div>
    </div>
  </div>
  );
};

export default DevicePage;

