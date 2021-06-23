import React,{useEffect,useState} from 'react';
import FixtureInfo from './FixtureInfo';
import {useAlert} from 'react-alert'
import axios from 'axios';
export default function Fixture() {
    
    const Alert = useAlert()

    const apiOptions = {
        method: 'GET',
        url: 'https://cricket-live-data.p.rapidapi.com/series',
        headers: {
          'x-rapidapi-key': 'cd878e4e8emsh294d7a87d6c753bp120aa3jsnf1fe1c974034',
          'x-rapidapi-host': 'cricket-live-data.p.rapidapi.com'
        }
      };

      const [fixtures,setFixture]=useState({
          type:"Test",
          data:[],
          sortedByCategory:[]
      })
      

      
      useEffect(()=>{
        axios.request(apiOptions).then(function (response) {
            setFixture({...fixtures,data:response.data.results})
        }).catch(function (error) {
            console.error(error);
        });
      },[])
      
      const handleRadioChange=(e)=>{
          const value = e.target.value;
        setFixture({...fixtures,type:value});
   
      }
    return (
        <div className="container">
            <div className="post-form-container">
            <div className="filters">
            <p>Filter By:
                <label>
                <input
              type="radio"
              value="Test"
              checked={fixtures.type==="Test"}
              onChange={handleRadioChange}
               />
                Test
                </label>
                <label>
                <input
              type="radio"
              value="ODI"
              checked={fixtures.type==="ODI"}
              onChange={handleRadioChange}
               />
                ODI
                </label>
                <label>
                <input
              type="radio"
              value="T20I"
              checked={fixtures.type==="T20I"}
              onChange={handleRadioChange}
               />
                T20I
                </label>
            </p>
        </div>
        </div>
           {
                fixtures.data.length?
                fixtures
                .data.filter(element => element.type === fixtures.type)
                .map((object)=>{
                 return object.series.map(fixture=><FixtureInfo key={fixture.series_id} fixture={fixture}/>)
                }):
                <h1 className="main-heading">waiting for data...</h1>
           }
        </div>
    )
}
