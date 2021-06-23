import React from 'react'

export default function UserInfo(props) {
    const {_id,firstName,email,lastName,role,isActive} = props.user;
    return (
        <tr>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>{role}</td>
        <td style={{"textAlign":'center'}}>{
            isActive?
            <button 
            className="btnDisable" 
            onClick={()=>props.disableAccount(_id)}>Deactivate</button>:
            <button 
            className="btnActivate" 
            onClick={()=>props.activateAccount(_id)}>Activate</button>
        }
        </td>
        </tr>
    )
}
