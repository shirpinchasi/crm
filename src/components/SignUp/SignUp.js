import React, { useState } from 'react';
import { useFormik } from 'formik';
import config from "../../config/index"
import { SignUpSchema } from './SignUpSchema';
import { Button, TextField } from '@material-ui/core';
import "./SignUp.scss";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';




const SignUp = () => {
  const [getError, setError] = useState("")
  const [showSuccess, setSuccess] = useState(false)
  const formik = useFormik({
    initialValues: {
      userName: "",
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      status: "Active"
    },

    validationSchema: SignUpSchema,
    onSubmit: async (values) => {
      const res = await fetch(config.apiUrl + "/user/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(values)
      });
      let result = await res.json();
      setError(result.message)
      if (res.status === 201) {
        setSuccess(true);
        window.location = result.redirectUrl
      }

      if (res.status === 500) {
        res.setStatus(500)

      } else if (res.status === 400) {
        let result = await res.json();
        setError(result.message)
      }
    },
  });

  return (

    <div id="signup_form">
      <Card id="card_signup">
        <form id='form_submit_signup' onSubmit={formik.handleSubmit}>
          <Typography variant="h5" component="div">
            Sign Up
          </Typography>
          <TextField
            id="userName"
            name="userName"
            label="User Name"
            type="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
          />
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            type="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            type="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
          {getError}
          <Button color="primary" id="button_submit_signup" variant="contained" type="submit">
            SIGN UP
          </Button>
        </form>
      </Card>







    </div>
  )

}



export default SignUp;