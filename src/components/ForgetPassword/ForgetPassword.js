import { Input } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Routes, Route } from 'react-router-dom';
import config from "../../config/index"
import { useFormik } from 'formik';
import { PasswordChange } from "./ForgetPasswordSchema"
import { Button, TextField } from '@material-ui/core';


export default function ForgetPassword() {
    const { id, token } = useParams()
    const [error, setError] = useState(true)
    const [passError, setPassError] = useState("")
    const [success, setSuccess] = useState("")
    const navigate = useNavigate()
    const [getToken, setToken] = useState([])
    const [Loading, setLoading] = useState(false)



    async function fetchTokens() {
        try {
            const fetchToken = await (await fetch(config.apiUrl + `/ForgetPassword/${id}/${token}`, {
                method: "GET",
                credentials: "include",
            })).json()

            if (fetchToken.err) {
                setToken(fetchToken.err)
                setError(true)
            } else {
                setError(false)
                setToken(fetchToken)
            }

        } catch (err) {
            throw err;
        }
    }
    useEffect(() => {
        fetchTokens()
    }, [])


    const formik = useFormik({
        initialValues: {
            password: "",
            passwordConfirmation: ""
        },
        validationSchema: PasswordChange,
        onSubmit: async (values) => {
            await fetch(config.apiUrl + `/ForgetPassword/${id}/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(values),

            }).then((response) => {
                response.json().then((res) => {
                    console.log(res.error);
                    setPassError(res.error)
                })
            })
            console.log(passError);


            // setSuccess(postingPassword)

            setSuccess("Password Reset Successfully, you will be redirected to the Login page in few seconds!")
            setLoading(true)
            setTimeout(function () {
                navigate("/Login")
            }, 5000);

        },


    });
    return (
        <>
            {error && <div>{getToken}</div>}
            {!error &&
                <>
                    {success ? <div>{success}</div> :
                        <div>
                            <h2>Reset Your Password!</h2>
                            <form id='form_submit' onSubmit={formik.handleSubmit}>
                                <TextField

                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && formik.errors.password}
                                    helpertext={formik.touched.password && formik.errors.password}
                                />
                                {formik.errors.password && <div id='error'>{formik.errors.password}</div>}
                                <TextField
                                    id="passwordConfirmation"
                                    name="passwordConfirmation"
                                    label="Password Confirmation"
                                    type="password"
                                    value={formik.values.passwordConfirmation}
                                    onChange={formik.handleChange}
                                    error={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                                    helpertext={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                                />
                                {formik.errors.passwordConfirmation && <div id='error'>{formik.errors.passwordConfirmation}</div>}
                                <Button color="primary" onSubmit={formik.onSubmit} variant="contained" id="button_submit" type="submit">
                                    Change Password
                                </Button>
                            </form>

                        </div>
                    }
                </>
            }
        </>
    )
}