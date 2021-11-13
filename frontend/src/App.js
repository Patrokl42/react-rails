import React from 'react';
import Login from './containers/Auth/Login';
import Registration from './containers/Auth/Registration';
import { Switch, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import './App.css';

function App() {
  return (
    <Box>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
      </Switch>
    </Box>
  );
}

export default App;
