import React from 'react';
import "./Users.css";

const Users = (props) => {
    console.log(props.users[0].name);
    return (
        <div>
            <h4>User1</h4>
        </div>
    );
};

export default Users;