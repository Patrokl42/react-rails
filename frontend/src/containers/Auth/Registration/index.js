import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import registrationFormSchema from './validation';
import { Link } from 'react-router-dom';
import { Grid, Box } from '@mui/material';

const Registration = () => {
  const { formState: { errors }, handleSubmit, control } = useForm({
    resolver: yupResolver(registrationFormSchema)
  });

  const onSubmit = (data) => {
    console.log(data);
  }

  const onError = (data) => {
    console.log(errors);
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', minWidth: '100vw' }}>
      <form className='registration form' onSubmit={handleSubmit(onSubmit, onError)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="login"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} id="outlined-basic" label="login" variant="outlined" />}
            />
            {errors && errors.login && <Box component="span" sx={{ display: 'block' }}>{errors.login}</Box>}
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} id="outlined-basic" label="Password" variant="outlined" />}
            />
            errors && errors.password && <Box component="span" sx={{ display: 'block' }}>errors.password</Box>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} id="outlined-basic" label="ConfirmPassword" variant="outlined" />}
            />
            errors && errors.confirmPassword && <Box component="span" sx={{ display: 'block' }}>errors.confirmPassword</Box>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type='submit'>Submit</Button>
          </Grid>
          <Grid item xs={12}>
            <Link to="/login">Sign In</Link>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}
export default Registration;