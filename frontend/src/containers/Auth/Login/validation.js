import * as yup from 'yup';

const loginFormSchema = yup.object().shape({
  login: yup.string().min(6).max(32).required('Login is required'),
  password: yup
    .string()
    .min(8, 'Password should be at least 8 characters')
    .max(30, 'Password should be less than 30 characters')
    .required()
});

export default loginFormSchema;