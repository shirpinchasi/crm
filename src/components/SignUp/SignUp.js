import React, { useState } from 'react';
import { useFormik, Formik, Form, Field } from 'formik';
import { useHistory, withRouter } from "react-router-dom";
import { SignUpSchema } from './SignUpSchema';





function SignUp() {
    const history = useHistory();
    const [showSuccess, setSuccess] = useState(false)

    const submit = async (values) => {
        console.log(values);
        const res = await fetch("http://localhost:5000/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        });
        if (res) {
            setSuccess(true);
            history.push("/Login")
        } else {
            res.setStatus(500)
            console.log("ERORR In creating user!");
        }
        return res;
    }
    

    return (

        <>
            <div id="Login">
                <div id="ajust1">
                    <Formik initialValues={{ userName: "", password: "",email : "" }}
                        validationSchema={SignUpSchema}
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
                                <div class="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field type="email" className="form-control" name="email" id="email" />
                                    {errors.email && touched.email && <small className="text-danger mt-2">{errors.email}</small>}
                                </div>
                                <div className="form-group">
                                    {showSuccess
                                        ? <div className="alert alert-success Register_success">Wait for transfer...</div>
                                        : <button type="submit" className="mt-3 Register_submit-btn" >Submit</button>}
                                </div>
                            </Form>

                        )}
                    </Formik>
                </div>
            </div>

            {/*         
            <div className="text-center"> 
                <h2 className="Register_title">Register now!</h2>
                <h4 className="Register_subtitle">It's quick and easy!</h4>
            </div>
    
        <div id="ajust" className="shadow-lg p-3 mb-5 bg-white rounded" >
        <Formik initialValues ={{userName : "", password : "", email:""}}
            validationSchema ={SignUpSchema}
            onSubmit={submit}>
            {({ errors, touched, isSubmitting})=>(
                    <Form className ="Register_form mt-1 px-0">
                        <div className="form-group">
                                <label htmlFor="username">UserName</label>
                                <Field type="text" class="form-control" id ="username"  name = "username" placeholder="2-16 characters"/>
                                {errors.userName && touched.userName && <small className="text-danger mt-2">{errors.userName}</small>}
                        </div>
                        
                        <div class="form-group">
                            <label htmlFor="Password">Password</label>
                            <Field type="password" className="form-control" name = "password" id="password" placeholder="6-16 characters"/>
                            {errors.password && touched.password && <small className="text-danger mt-2">{errors.password}</small>}
                        </div>
                        <div class="form-group">
                            <label htmlFor="email">Email</label>
                            <Field type="email" className="form-control" name = "email" id="email" />
                            {errors.email && touched.email && <small className="text-danger mt-2">{errors.email}</small>}
                        </div>
                        
                        <div className="form-group">
                            {showSuccess
                                ?<div className="alert alert-success Register_success">Wait for transfer...</div>
                                : <button type="submit" className="mt-3 Register_submit-btn" disabled={isSubmitting}>Submit</button>}
                        </div>
                    </Form>
                )}
            </Formik>
            </div> */}
        </>
    )

}


export default SignUp;