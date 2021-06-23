import React from 'react'
import TableInfo from './TableInfo'
export default function DataTable(props) {
    return (
        <table id="ranking">
        <tr>
            <th>Ranking</th>
            <th>Team</th>
            <th>Description</th>
        </tr>
        {
            props.rankingData.map(ranking=><TableInfo ranking={ranking}/>)
        }
        
        
    </table>
    )
}
