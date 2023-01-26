
import styles from '@/styles/Home.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Home() {
  let [data , setData] = useState([]);
  let [weather, setWeather] =useState('');
  const getData= async ()=>{
    try{
      let da=  await axios.get("https://api.openweathermap.org/data/2.5/weather?q=hanoi&units=metric&lang=vi&APPID=7eb233db871286712aa08aa9c62ef0b8");
      return da.data;
    }
    catch(e){
      console.log(e)
      }
  };
  useEffect(()=>{getData().then(rev=>{
    setData(()=>data= rev )
    setWeather(()=>weather={...rev.weather[0]})
  }).catch(e=>console.log(e))},[]);

  let element = data!==[]?
      (<div style={{textAlign:"Left", fontSize:"13px"}}>
              
              <img height="70" width="70" src="http://openweathermap.org/images/transparent.png" style=   
                          {{ border: "none", backgroundImage:`url("http://openweathermap.org/img/w/${{...weather}.icon}.png")`
                ,backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat' }} 

                          />
              <h3>Temperature: {{...data.main}.temp} °C </h3>
              <div>Clouds: {{...data.clouds}.all} % </div>
              <div>Humidity: {{...data.main}.humidity} % </div>
              <div>Wind: {{...data.wind}.speed} m/s </div>
              <div>Pressure: {{...data.main}.pressure} hpa </div>
             </div>
             
       ) : "";
  return (
   <div className={styles.container}>
      <h2>Thông tin thời tiết tại Hà Nội</h2>
        {element }
   </div>
  )
}
