import React from 'react';
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const user = useSelector(state => state.user.user);

  return (
    <h1>Hey, {user.email}</h1>
  )
}

export default Dashboard;