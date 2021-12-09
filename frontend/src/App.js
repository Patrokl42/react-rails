import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Box, CssBaseline } from '@mui/material';
import Login from './containers/Auth/Login';
import Registration from './containers/Auth/Registration';
import StartPage from './containers/StartPage';
import NotFound from './containers/NotFound'
import AuthenticatedRouter from './containers/AuthenticatedRouter';
import './App.css';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  console.log(isAuthenticated);

  return (
    <Box>
      <CssBaseline />
      <Switch>
        <Route path="/" component={StartPage} exact />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
      </Switch>
      <AuthenticatedRouter />
    </Box>
  );
}

export default App;
