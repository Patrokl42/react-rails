import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Dashboard from '../Dashboard';
import Navigation from '../../components/Naviation';
import { checkLoginStatus } from '../../modules/auth/actions';
import { Box } from '@mui/material';

const AuthenticatedRouter = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => { dispatch(checkLoginStatus(() => history.push('/dashboard'))) }, []);

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Navigation handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} open={open} />
      <Box sx={{
        padding: '64px 0 0 0'
      }}>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Box>
    </>
  )
}

export default AuthenticatedRouter;