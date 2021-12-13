import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { Box, CssBaseline } from '@mui/material';
import Login from './containers/Auth/Login';
import Registration from './containers/Auth/Registration';
import StartPage from './containers/StartPage';
import NotFound from './containers/NotFound'
import AuthenticatedRouter from './containers/AuthenticatedRouter';
import { checkLoginStatus } from './modules/auth/actions';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() =>
    dispatch(checkLoginStatus()), []);

  console.log(isAuthenticated);

  return (
    <Box style={{ background: '#502977' }}>
      <CssBaseline />
      {!isAuthenticated &&
        <Switch>
          <Route path="/" component={StartPage} exact />
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />
        </Switch>
      }
      {isAuthenticated && <AuthenticatedRouter />}
    </Box>
  );
}

export default App;
