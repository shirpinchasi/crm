import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { LoginSchema } from "./loginSchema";
import { UserContext } from "../../userContext";
import { useHistory, Link, withRouter } from "react-router-dom";
import config from "../../config/index"


function Login() {
        const { setUser } = useContext(UserContext);
        const history = useHistory();
        const [data,setData] = useState("")
        const [auth, setAuth] = useState(false)

        const submit  = async (values) => {
                console.log(values);
                const res = await  fetch(config.apiUrl +  "/user/login", {
                        method: "POST",
                        headers : {
                                "Content-Type": "application/json"
                            },
                        
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
                
        }




        return (

                <>
                        <div id="Login">
                                <div id="ajust1">
                                        <Formik initialValues={{ userName: "", password: "" }}
                                                validationSchema={LoginSchema}
                                                onSubmit={submit}>

                                                {({ errors, touched }) => (
                                                        <Form className="Login_form">
                                                                <h2 className="Login_title">Login</h2>
                                                                <div class="form-group">
                                                                </div>
                                                                <label htmlFor="username">UserName</label>
                                                                <Field type="text" class="form-control" name="userName" id="userName" />
                                                                {errors.userName && touched.userName && <small className="text-danger mt-2">{errors.userName}</small>}

                                                                <div class="form-group">
                                                                        <label htmlFor="Password">Password</label>
                                                                        <Field type="password" class="form-control" name="password" id="password" />
                                                                        {errors.password && touched.password && <small className="text-danger mt-2">{errors.password}</small>}
                                                                </div>
                                                                <p>{data}</p>
                                                                <button type="submit" class="btn btn-primary" id="button">Login</button>
                                                                <div className="text-center">
                                                                        Don't have an account? <Link to="/SignUp" className="Login__register-link">Register</Link>
                                                                </div>
                                                        </Form>

                                                )}
                                        </Formik>
                                </div>
                        </div>

                </>
        )

}

export default Login;