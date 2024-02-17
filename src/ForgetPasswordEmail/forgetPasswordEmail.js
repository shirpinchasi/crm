import React, { useState, useEffect } from "react";
import { ForgetPasswordEmailSchema } from "./forgetPasswordSchema";
import { useFormik } from 'formik';
import config from "../config/index"
import { Button, TextField } from '@material-ui/core';
import "./forgetPassword.scss"

export default function ForgetPasswordEmail() {
    const [error,setError] = useState("")
    const [success, setSuccess] = useState("")

    const formik = useFormik({
        initialValues: {
            email: "",
        },


        validationSchema: ForgetPasswordEmailSchema,
        onSubmit: async (values) => {
           await fetch(config.apiUrl + "/ForgetPasswordEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(values),

            })
                
               setSuccess("Email send successfully! please check your inbox!")
           
           
        },

    });
    return (
        <>
        {success ?<div id="successMessage">{success}</div> : 
        <>
            <h2>Fill Your Email Address</h2>
            <form id="form_submit_forget" onSubmit={formik.handleSubmit}>
                <div id="flex_inputs_forget">
                    <TextField
                        id="input"
                        name="email"
                        label="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && formik.errors.email}
                        helpertext={formik.touched.email && formik.errors.email}
                    />
                    {/* {error}
                    {success} */}
                    {/* <TextField
                        id="input"
                        name="password"
                        label="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && formik.errors.password}
                        helpertext={formik.touched.password && formik.errors.password}
                    />
                    <TextField
                        id="input"
                        name="password confirmation"
                        label="password confirmation"
                        type="password"
                        value={formik.values.passwordConfirmation}
                        onChange={formik.handleChange}
                        error={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                        helpertext={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                    /> */}
                </div>
                <Button color="primary" onSubmit={formik.onSubmit} variant="contained" id="button_submit" type="submit">
                    Send
                </Button>
            </form>
            </>
}

        </>
    )
}