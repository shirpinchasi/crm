import React, { useEffect, useState } from 'react';
import { useFormik, Formik, Form, Field } from 'formik';
import { useHistory, withRouter } from "react-router-dom";
import config from "../../config/index"
import { SignUpSchema } from './SignUpSchema';
import { Button, TextField } from '@material-ui/core';
import "./SignUp.scss"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';




    const  SignUp = () => {
        const history = useHistory();
     const [getError,setError] = useState("")
     const [showSuccess, setSuccess] = useState(false)
        const formik = useFormik({
          initialValues: {
            userName :"",
            password : "",
            email : ""
          },
          
          validationSchema: SignUpSchema,
           onSubmit: async (values) => {
            const res = await fetch(config.apiUrl+ "/user/signup", {
                method: "POST",
                headers : {
                    "content-type": "application/json"
                },
                body: JSON.stringify(values)
            });
            let result = await res.json();
            setError(result.message)
            console.log(result.message);

            if (res.status === 500) {
                res.setStatus(500)
               
                
                
                console.log("ERORR In creating user!");
                
            }else if(res.status === 400){
                let result = await res.json();
                setError(result.message)
            }
            
            else {
                setSuccess(true);
                history.push("/Login")
            }
          },
        });
        console.log(getError);

        

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
          label="userName"
          type="userName"
          value={formik.values.userName}
          onChange={formik.handleChange}
          error={formik.touched.userName && Boolean(formik.errors.userName)}
          helperText={formik.touched.userName && formik.errors.userName}
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
        {/* {getError} */}
        <Button color="primary"  id="button_submit_signup" variant="contained"  type="submit">
          SIGN UP
        </Button>
      </form>
    </Card>
    
                
                   
                
           

            
        </div>
    )
        
                }



export default SignUp;