import React, { useContext, useEffect, useState } from "react";
import { UpdateUserSchema } from "./UserSchema";
import { Link, useParams } from "react-router-dom";
import config from "../../config/index"
import { Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import "./userInfo.scss"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import GetUsers from "./getUsers";
import GetSystems from "../Systems/GetSystems";
import Teams from "../Teams/Teams";
import TeamMembers from "../Teams/teamMembers";


export default function UpdateUser(props) {
    const { id } = useParams();
    const [user, setUser] = useState([]);



    async function fetchUser() {
        const getUsers = await (await fetch(config.apiUrl + `/getUser/${id}`, {
          method: "GET",
          credentials: "include",
        })).json()
        setUser(getUsers.user)
      }

      console.log(props.userName);

    const formik = useFormik({
        initialValues: {
            userName: user.userName,
            firstName: props.firstName,
            lastName: props.lastName,
            email: props.email,
            status: "Active",
            team:props.teams,
            lastUpdater: props.lastUpdater,
        },
    
        validationSchema: UpdateUserSchema,
        onSubmit: async (values) => {
            await fetch(config.apiUrl + `/updateUser/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(values),
    
            })
            window.location.reload()
    
        },
    
    });

    useEffect(() => {
        fetchUser()
      }, [])

    return (
        <>

                <form id='form_submit' onSubmit={formik.handleSubmit}>
                    <div id="flex_inputs">
                    <TextField
                            disabled
                            id="input"
                            name="userName"
                            label="userName"
                            type="userName"
                            value={formik.values.userName}
                            onChange={formik.handleChange}
                            error={formik.touched.userName && formik.errors.userName}
                            helpertext={formik.touched.userName && formik.errors.userName}
                        />
                        <TextField
                            
                            id="input"
                            name="firstName"
                            label="firstName"
                            type="text"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            error={formik.touched.status && formik.errors.status}
                            helpertext={formik.touched.status && formik.errors.status}
                        />
                        <TextField
                        disabled
                            id="input"
                            name="email"
                            label="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && formik.errors.email}
                            helpertext={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            disabled
                            id="input"
                            name="status"
                            label="status"
                            type="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            error={formik.touched.status && formik.errors.status}
                            helpertext={formik.touched.status && formik.errors.status}
                        />
                        <TextField
                            disabled
                            id="input"
                            name="status"
                            label="status"
                            type="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            error={formik.touched.status && formik.errors.status}
                            helpertext={formik.touched.status && formik.errors.status}
                        />
                        <TextField
                            disabled
                            id="input"
                            name="status"
                            label="status"
                            type="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            error={formik.touched.status && formik.errors.status}
                            helpertext={formik.touched.status && formik.errors.status}
                        />
                        <div>
                            <Teams labelId="teams" id="input" name="team" value={formik.values.team} onChange={formik.handleChange} error={formik.touched.team && formik.errors.team} helpertext={formik.touched.team && formik.errors.team} labelIdAssignee="assignee" idAssignee="assignee" nameAssignee="assignee" valueAssignee={formik.values.assignee} onChangeAssignee={formik.onChange} errorAssignee={formik.touched.assignee && formik.errors.assignee} helpertextAssignee={formik.touched.assignee && formik.errors.assignee} />
                        </div>



                    </div>
                    <Button color="primary" onSubmit={formik.onSubmit} variant="contained" id="button_submit" type="submit">
                        Update User
                    </Button>
                </form>
        </>
    )
}