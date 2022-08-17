import React, { useContext, useState } from "react";
import { LoginSchema } from "./loginSchema";
import { UserContext } from "../../userContext";
import { Link } from "react-router-dom";
import config from "../../config/index"
import { Button, CardContent, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import "./Login.scss";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import SignUp from "../SignUp/SignUp";
import logo from "../../logo_transparent.png"
const Login = () => {
  const { setUser } = useContext(UserContext);
  const [data, setData] = useState("")
  const [value, setValue] = useState("1")
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);

  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const res = await fetch(config.apiUrl + "/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(values),

      });

      if (res.status === 200) {
        const loggedUser = await res.json();
        setUser(loggedUser);
        console.log(loggedUser);
        window.location = loggedUser.redirectUrl
      }

      else if (res.status === 400 || res.status === 401) {
        let result = await res.json();
        setData(result.message);


      }
      return res;
    },
  });
  return (
    <Box className="tabsHome" sx={{ width: '90%', typography: 'body1' }}>
      <TabContext value={value} >

        <TabPanel id="TabPanel" value="1">
          <div id="login_form">
            <Card id="card">
            <div className="logo">
                <img alt="" height="150px" src={logo}/>
                </div>
            <Box className="tabsLogin" sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList centered id="tabList" onChange={handleChange} >
            
            <Tab className="tab" label="Login" value="1" />
            <Tab className="tab" label="Sign Up" value="2" />
            
          </TabList>
        </Box>
              <CardContent>
              <form id='form_submit' onSubmit={formik.handleSubmit}>
                <Typography variant="h5" component="div">
                
                </Typography>
                
                <div id="inputs">
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
              <div id="error">
                {data}
              </div>
              <div className="text-center">
                {/* <Link to="/ForgetPassword" >forget</Link> */}
                <Link to="/ForgetPasswordEmail" className="Login__register-link">Don't remember your password?</Link>
                <br />
                {/* <Link to="/SignUp" className="Login__register-link">Don't have an account? Register</Link> */}
              </div>
              </CardContent>
            </Card>
          </div>
        </TabPanel>
      </TabContext>
      <TabContext value={value} >
      <TabPanel id="TabPanel" value="2">
          <div id="login_form">
            <Card id="card">
            <div className="logo">
                <img alt="" height="150px" src={logo}/>
                </div>
            <Box className="tabsLogin" sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList centered id="tabList" onChange={handleChange} >
            
            <Tab className="tab" label="Login" value="1" />
            <Tab className="tab" label="Sign Up" value="2" />
            
          </TabList>
        </Box>
              <CardContent>
              <SignUp/>
              
            
              </CardContent>
            </Card>
          </div>
        </TabPanel>

      </TabContext>

    </Box>
 )

}



export default Login;
