import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from '../../components/Naviation';
import Exercises from '../Exercises';
import Dashboard from '../Dashboard';
import { Box } from '@mui/material';

const AuthenticatedRouter = () => {
  const [open, setOpen] = useState(false);

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
        padding: `64px 0 0 73px`
      }}>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/exercises" component={Exercises} />
        </Switch>
      </Box>
    </>
  )
}

export default AuthenticatedRouter;