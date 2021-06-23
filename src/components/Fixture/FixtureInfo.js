import React from 'react'
import crossBatImg from '../../images/crossbats2.jpg'
export default function FixtureInfo(props) {
    const {series_name,season,status} = props.fixture
    return (
        <div className="fixture-card">
            <img src={crossBatImg} width="100px" alt="" />
            <h2>{series_name}</h2>
            <p>status: {status}</p>
            <p>season: {season}</p>
        </div>
    )
}
