import * as Yup from 'yup';

export const ForgetPasswordEmailSchema = Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Required'),
      link : Yup.string()
    //   password: Yup.string().required('Password is required'),
    //   passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Password Confirmation is required')
  });
//   export const ForgetPasswordSchema = Yup.object().shape({
//     email: Yup.string().email('Invalid email').required('Required'),
//     password: Yup.string().required('Password is required'),
//     passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Password Confirmation is required')
// });