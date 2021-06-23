import React from 'react'
import UserInfo from './UserInfo'
export default function UserTable(props) {
    const {userInfo} = props;
    return (
        <table id="ranking">
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
        </tr>
        {
            userInfo.map(user=><UserInfo 
                activateAccount={props.activateAccount} 
                disableAccount={props.disableAccount} 
                user={user}/>)
        }
        
        </table>
    )
}
