import React, { useState, useContext } from 'react'
import UserContext from '../context/UserContext'

export default function Profile () {
    const {user}=useContext(UserContext)
    if (!user) return <div>Please login</div>
  return (
    <div>
      <h1>Welcome {user.username}</h1>
    </div>
  );
};
