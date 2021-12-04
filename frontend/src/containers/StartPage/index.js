import React from "react";
import { Paper, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import "./index.scss";

const StartPage = () => {
  return (
    <Box className="start-page" sx={{
      display: 'flex', alignItems: 'center'
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        padding: '0 5rem'
      }}>
        <Paper>
          <h1>Welcome to the graytes spot site for ever!!!</h1>
          <h2>Site description</h2>
        </Paper>
        <Paper elevation={2} sx={{
          padding: '3rem'
        }}>
          <h3>Come to be stronger</h3>
          <Box>
            <Button variant="contained"><Link to="/login">Sign In</Link></Button>
            <Button variant="outlined"><Link to="/registration">Registration</Link></Button>
          </Box>
        </Paper>
      </Box>
    </Box >
  )
};

export default StartPage;