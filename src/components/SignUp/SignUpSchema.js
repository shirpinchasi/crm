import * as Yup from 'yup';

export const SignUpSchema = Yup.object().shape({
    userName: Yup.string()
      .required('Required'),
    password: Yup.string()
      .min(6, 'Too Short!')
      .max(16, 'Too Long!')
      .required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
  });
