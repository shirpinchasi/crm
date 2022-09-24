import * as Yup from 'yup';

export const UserSchema = Yup.object().shape({
    userName: Yup.string()
      .required('Required'),
    firstName: Yup.string()
    .required('Required'),
    lastName: Yup.string()
      .required('Required'),
      status: Yup.string()
      .required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      team:Yup.string()
      .required("Required")
  });


export const UpdateUserSchema = Yup.object().shape({
  userName: Yup.string()
      .required('Required'),
    firstName: Yup.string()
    .required('Required'),
    lastName: Yup.string()
      .required('Required'),
      status: Yup.string()
      .required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      team:Yup.string()
      .required("Required"),
      lastUpdater:Yup.string()
      .required('Required')
})