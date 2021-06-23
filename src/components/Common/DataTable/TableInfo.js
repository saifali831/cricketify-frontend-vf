import React from 'react'

export default function TableInfo(props) {
    const {teamName,description,ranking}=props.ranking;
    return (
        <tr>
        <td>{ranking}</td>
        <td>{teamName}</td>
        <td>{description}</td>
        </tr>
    )
}
