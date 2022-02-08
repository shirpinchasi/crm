import React, { useContext, useEffect, useState } from "react";
import { LoginSchema } from "./loginSchema";
import { UserContext } from "../../userContext";
import { useHistory, Link, withRouter } from "react-router-dom";
import config from "../../config/index"
import { Button, TextField } from '@material-ui/core';
import { useFormik, Formik, Form, Field } from 'formik';
import "./Login.scss"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const  Login = () => {
        const { setUser } = useContext(UserContext);
        const history = useHistory();
        const [data,setData] = useState("")
        const formik = useFormik({
          initialValues: {
            userName :"",
            password : "",
          },
          validationSchema: LoginSchema,
           onSubmit: async (values) => {
                const res = await  fetch(config.apiUrl +  "/user/login", {
                        method: "POST",
                        headers : {
                                "Content-Type": "application/json"
                            },
                        credentials:"include",
                        body: JSON.stringify(values),
                 
                });
                
                if (res.status === 200) {
                        const loggedUser = await res.json();
                        setUser(loggedUser);
                        console.log(loggedUser)
                        history.push("/")
                } 
                
                else if (res.status === 401) {
                        let result = await res.json();
                        console.log(result.message);
                        setData(result.message);
                        
                        
                }
                return res;
          },
        });

    return (

        <div id="login_form">
             <Card id="card">
      <form id='form_submit' onSubmit={formik.handleSubmit}>
      <Typography variant="h5" component="div">
          Login
        </Typography>
        <div id="inputs">
      <TextField
          id="userName"
          name="userName"
          label="UserName"
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
        </div>
        
        <Button color="primary" variant="contained" id="button_submit" type="submit">
          Submit
        </Button>
      </form>
      <div>
      {data}
      </div>
      <div className="text-center">
        <Link to="/SignUp" className="Login__register-link">Don't have an account? Register</Link>
        </div>
    </Card>
                
                   
                
           

            
        </div>
    )
        
                }



export default Login;
