import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginFormSchema from './validation';
import { Link } from 'react-router-dom';
import { Stack, Box, Alert, Paper, Grid, styled } from '@mui/material';
import { loginWithEmail } from '../../../modules/auth/actions'
import { useHistory } from 'react-router';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const serverError = useSelector(state => state.auth.serverErrors);

  const { formState, handleSubmit, control } = useForm({
    resolver: yupResolver(loginFormSchema)
  });

  const { errors } = formState;

  const onSuccess = () => {
    history.push("/dashboard");
  }

  const onSubmit = (data) => {
    dispatch(loginWithEmail(data, onSuccess))
  }

  const Item = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
  }));

  console.log(serverError);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', minWidth: '100vw' }}>
      <form className='registration form' onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Item>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} fullWidth id="outlined-basic" label="email" variant="outlined" />}
            />
            {errors && errors.email && <Alert severity="error">{errors.email.message}</Alert>}
          </Item>
          <Item>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} fullWidth id="outlined-basic" label="Password" variant="outlined" />}
            />
            {errors && errors.password && <Alert severity="error">{errors.password.message}</Alert>}
          </Item>
          <Item>
            <Button variant="contained" type='submit'>Submit</Button>
          </Item>
          <Item>
            <Link to="/login">Sign In</Link>
          </Item>
        </Stack>
      </form>
    </Box>
  )
}
export default Login;