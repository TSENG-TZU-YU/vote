import { useEffect, useState } from "react";
import axios from "axios";
import "./todo.scss";
import Geocode from "react-geocode";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyAdrIEmfZ0kjOwnv5hxt7m_PgXAsw9IUoI");

// set response language. Defaults to english.
Geocode.setLanguage("en");

Geocode.setLocationType("ROOFTOP");
// 台北市北投區石牌路一段82號2樓
function Map() {
  const [data, setData] = useState([
    {
      address: "臺北市北投區建民里文林北路77號",
    },
    {
      address: "臺北市北投區建民里明德路50號",
    },
    {
      address: "台北市北投區石牌路一段82號2樓",
    },
  ]);
  const [add, setAdd] = useState([]);

  // console.log("data", data);
  useEffect(() => {
    let a =async()=>{
      let list = [];
      for (let i = 0; i < data.length; i++) {
        let res =await Geocode.fromAddress(`${data[i].address}`)
        let address = res.results[0].geometry.location;
        list.push(address);
      }
      console.log("list", list);
      setAdd(list);
    }
    a();
  }, []);

  return (
    <>
      {add.map((v, i) => {
        return (
          <div key={i}>
            {v.lat},{v.lng}
          </div>
        );
      })}
    </>
  );
}

export default Map;
