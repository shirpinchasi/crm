import { Box, Button, SliderTrack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./newUser.scss"
import { useFormik } from 'formik';
import config from "../../config/index"
import { AddUserSchema } from './addUserSchema';
import { TextField } from '@mui/material';
import Backdrop from '@material-ui/core/Backdrop';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Teams from '../Teams/Teams';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';


export default function NewUser(props) {
    const [newUserError, setNewUserError] = useState("")
    const [open, setOpen] = useState(false);
    const [openBackDrop, setOpenBackDrop] = useState(false);


    const handleBackDropOpen = () => {
        setOpenBackDrop(true);
    };
    const handleBackDropClose = () => {
        setOpenBackDrop(false);
    };

    const formik = useFormik({
        initialValues: {
            userName: "",
            firstName: "",
            lastName: "",
            status: "Active",
            roles: "",
            email: "",
            team: ""
        },


        validationSchema: AddUserSchema,
        onSubmit: async (values) => {
            await fetch(config.apiUrl + "/addUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(values),

            })
            window.location.reload()
                .then((response) => {
                    response.json().then((res) => {
                        setNewUserError(res.message)
                    })
                })
        },

    });

    return (
        <>
            <form id='form_submit' onSubmit={formik.handleSubmit}>
                <div id="flex_inputs_new_user">

                    <TextField
                        id="input"
                        name="userName"
                        label="User Name"
                        type="userName"
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                        error={formik.touched.status && formik.errors.userName}
                        helpertext={formik.touched.userName && formik.errors.userName}
                    />

                    <TextField
                        id="input"
                        name="firstName"
                        label="First Name"
                        type="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={formik.touched.firstName && formik.errors.firstName}
                        helpertext={formik.touched.firstName && formik.errors.firstName}
                    />
                    <TextField
                        id="input"
                        name="lastName"
                        label="Last Name"
                        type="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && formik.errors.lastName}
                        helpertext={formik.touched.lastName && formik.errors.lastName}
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
                        id="input"
                        name="email"
                        label="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && formik.errors.email}
                        helpertext={formik.touched.email && formik.errors.email}
                    />
                    <InputLabel id="addUserForm">Role</InputLabel>
                    <Select sx={{ minWidth: 120 }}
                        labelId="Role"
                        id="roles"
                        name="roles"
                        value={formik.values.roles}
                        label="roles"
                        onChange={formik.handleChange}
                        error={formik.touched.roles && formik.errors.roles}
                        helpertext={formik.touched.roles && formik.errors.roles}
                    >
                        <MenuItem key={"user"} value={"user"}>{"user"}</MenuItem>
                        <MenuItem key={"admin"} value={"admin"}>{"admin"}</MenuItem>

                    </Select>

                    <Teams labelId="teams" id="input" name="team" value={formik.values.team} onChange={formik.handleChange} error={formik.touched.team && formik.errors.team} helpertext={formik.touched.team && formik.errors.team} />

                </div>
                <div id='error'>{newUserError}</div>
                <Button color="primary" onSubmit={formik.onSubmit} variant="contained" id="button_submit" type="submit">
                    Add User
                </Button>
            </form>

        </>
    )
}