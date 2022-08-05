import * as Yup from 'yup';

export const passwordChange = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string().required('Password Confirmation is required')
       .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });
  