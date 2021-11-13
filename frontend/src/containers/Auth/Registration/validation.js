import * as yup from 'yup';

const registrationFormSchema = yup.object().shape({
  login: yup.string().min(6).max(32).required('Login is required'),
  password: yup
    .string()
    .min(8, 'Password should be at least 8 characters')
    .max(30, 'Password should be less than 30 characters')
    .required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

export default registrationFormSchema;