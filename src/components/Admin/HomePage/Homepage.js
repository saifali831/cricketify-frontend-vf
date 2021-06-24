import React,{useState} from 'react'
import {Table} from '../../Common';
import axios from 'axios';
import {useAlert} from 'react-alert';
export default function Homepage() {
    const Alert = useAlert();

    const [state,setState]=useState({
        name:"",
        description:"",
        ranking:0,
        format:"Test",
        testData:[],
        odiData:[],
        t20Data:[]
    })

    const handleAddRanking=()=>{
        const {name,description,ranking,format}=state;
        axios
        .post("https://cricketify-backend.herokuapp.com/api/ranking/add",{name,description,ranking,format})
        .then(result=>{
            const {dbData} = result.data;
            if(dbData.format==="Test"){
                const testData=[...state.testData];
                testData.push(result.data.dbData);
                setState({...state,testData:testData});
            }
            if(dbData.format==="ODI"){
                const odiData=[...state.odiData];
                odiData.push(result.data.dbData);
                setState({...state,odiData:odiData});
            }
            if(dbData.format==="T20I"){
                const t20Data=[...state.t20Data];
                t20Data.push(result.data.dbData);
                setState({...state,t20Data:t20Data});
            }
            Alert.show(result.data.message,{type:'success'});
        })
        .catch(error=>{
            alert.show(error.response.data.message,{type:"error"});
        })
    }
    const handleChange=(e)=>{
        const value = e.target.value;
        setState({...state,[e.target.name]:value})
    }
    const handleRadio=(e)=>{
        const value = e.target.value;
        setState({...state,format:value})
    }
    return (
            <div className="container">
            <div className="row">
                <div className="col-12 col-md-12 col-lg-6 col-xl-6">
                <h1 className="main-heading">Add new rankings</h1>
                <div className="ranking-form-container">
                <div className="formgroup">
                  <label htmlFor="name">Team Name</label>
                  <input 
                  type="text" 
                  name="name" 
                  onChange={handleChange}
                  />
                </div>
                <div className="formgroup">
                  <label htmlFor="ranking">Ranking</label>
                  <input 
                  type="number" 
                  name="ranking" 
                  min="0"
                  onChange={handleChange}
                  />
                </div>
                <div className="formgroup">
                  <label htmlFor="description">Description</label>
                  <input 
                  type="text" 
                  name="description"
                  onChange={handleChange} 
                  />
                </div>
                <div className="filters">
                <p>Select Format:
                    <label>
                    <input
                type="radio"
                value="Test"
                checked={"Test"===state.format}
                onChange={handleRadio}
                />
                    Test
                    </label>
                    <label>
                    <input
                type="radio"
                value="ODI"
                checked={"ODI"===state.format}
                onChange={handleRadio}
                />
                    ODI
                    </label>
                    <label>
                    <input
                type="radio"
                value="T20I"
                checked={"T20I"===state.format}
                onChange={handleRadio}
                />
                    T20I
                    </label>
                </p>
            </div>
            <button 
            className="btnprimary"
            onClick={handleAddRanking}>Add</button>
        </div> 
        </div>
        <div className="col-12 col-md-12 col-lg-6 col-xl-6">
        <h3 className="sub-heading">Tests</h3>
        {
            state.testData.length?
            <Table rankingData={state.testData}/>:
            <p className="textInfo">Please add test ranking</p>
        }
        
        <h3 className="sub-heading">ODI</h3>
        {
            state.odiData.length?
            <Table rankingData={state.odiData}/>:
            <p className="textInfo">Please add odi ranking</p>
        
        }
        <h3 className="sub-heading">T20I</h3>
        {
            state.t20Data.length?
            <Table rankingData={state.t20Data}/>:
            <p className="textInfo">Please add t20 ranking</p>
        }
       </div>
    </div>
    </div>
            )
}
