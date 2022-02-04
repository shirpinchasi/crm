import * as Yup from 'yup';



export const SignUpSchema = Yup.object().shape({
    userName: Yup.string()
      .required('Required'),
    //   .test('isUnique', 'Username is already taken', (value) => isUnique('username', value)),
    password: Yup.string()
      .min(6, 'Too Short!')
      .max(16, 'Too Long!')
      .required('Required'),
      email: Yup.string()
      .required("Required")
      .email("Invalid Email")
    //   .test('isUnique', 'Email is in use', (value) => isUnique('email', value)),
  });

//   const memo = {
//     username: {}
//   };
  
//   async function isUnique(field, value) {
//     if (memo[field].hasOwnProperty(value)) {
//       return memo[field][value];
//     }
//     const res = await fetch(`http://localhost:5000/addUser?${field}=${value}`);
//     memo[field][value] = !(await res.json());
//     return memo[field][value];
//   }