import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginFormSchema from './validation';
import { Link } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(loginFormSchema)
  });

  const onSubmit = (data) => {
    console.log(data);
  }

  const onError = (data) => {
    console.log(data);
  }

  return (
    <form className='login form' onSubmit={handleSubmit(onSubmit, onError)}>
      <Controller
        name="login"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField id="outlined-basic" label="Login" variant="outlined" />}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField {...field} id="outlined-basic" label="Password" variant="outlined" />}
      />
      <Button variant="contained" type='submit'>Submit</Button>
      <Link to="/registration">Sign Up</Link>
    </form>
  )
}
export default Login;