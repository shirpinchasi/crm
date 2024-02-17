import React, { useContext, useState } from "react";
import { LoginSchema } from "./loginSchema";
import { UserContext } from "../../userContext";
import config from "../../config/index"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
// import logo from "../../../public/logo.png"


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const Login = () => {
    const { setUser } = useContext(UserContext);
  const [data, setData] = useState("")
  const [value, setValue] = useState("1")
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        window.location = loggedUser.redirectUrl
      }

      else if (res.status === 400 || res.status === 401) {
        let result = await res.json();
        console.log(result.message);
        setData(result.message);


      }
      return res;
    },
  });

  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/logo.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'black' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 0,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            <form component="form" onSubmit={formik.handleSubmit} >
            <TextField
                      id="userName"
                      name="userName"
                      label="User Name"
                      type="userName"
                      fullWidth
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
                      fullWidth
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={formik.touched.password && formik.errors.password}
                      helperText={formik.touched.password && formik.errors.password}
                    />
              
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <div id="error">
                  {data}
                </div>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/Login" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 0 }} />
              </form>
            </Box>
        </Grid>
      </Grid>
  );
}

export default Login;