import React from 'react';
import "./Users.css";

const Users = (props) => {
    console.log(props.users[0].name);
    return (
        <div>
            <h4>User1</h4>
            {/* <h4>{props.users.name}</h4> */}
        </div>
    );
};

export default Users;