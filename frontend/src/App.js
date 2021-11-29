import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { Box } from '@mui/material';
import Login from './containers/Auth/Login';
import Registration from './containers/Auth/Registration';
import Dashboard from './containers/Dashboard';
import { checkLoginStatus } from './modules/auth/actions'
import './App.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(checkLoginStatus()) }, [])
  return (
    <Box>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Box>
  );
}

export default App;
