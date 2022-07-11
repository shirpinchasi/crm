import React, { useContext, useEffect, useState } from "react";
import { CallSchema } from "./callSchema";
import config from "../../config/index"
import { Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import "./NewCall.scss";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import GetUsers from "../Users/getUsers";
import GetSystems from "../Systems/GetSystems";
import Teams from "../Teams/Teams";
import TeamMembers from "../Teams/teamMembers";



export default function NewCall(props) {
    console.log(props.props);

    const formik = useFormik({
        initialValues: {
            userName: "",
            system: "",
            assignee: "",
            team: "",
            status: "Open",
            description: "",
            link: window.location.origin,
        },


        validationSchema: CallSchema,
        onSubmit: async (values) => {
            await fetch(config.apiUrl + "/addCall", {
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

console.log(props);
    return (
        <>
            {props.props === false ? null :
                <form id='form_submit' onSubmit={formik.handleSubmit}>
                    <div id="flex_inputs">
                        <div>
                            <GetUsers label="userName" labelId="userName" id="input" name="userName" value={formik.values.userName} onChange={formik.handleChange} error={formik.touched.userName && formik.errors.userName} helpertext={formik.touched.userName && formik.errors.userName} />
                        </div>
                        <div>
                            <GetSystems labelId="system" id="input" name="system" value={formik.values.system} onChange={formik.handleChange} error={formik.touched.system && formik.errors.system} helpertext={formik.touched.system && formik.errors.system} />
                        </div>
                        <div>
                            <Teams labelId="teams" id="input" name="team" value={formik.values.team} onChange={formik.handleChange} error={formik.touched.team && formik.errors.team} helpertext={formik.touched.team && formik.errors.team} />
                        </div>
                        {/* labelIdTeam="assignee" idTeam="assignee" nameTeam="assignee" valueTeam={formik.values.assignee} onChangeTeam={formik.onChange} errorTeam={formik.touched.assignee && formik.errors.assignee} helpertextTeam={formik.touched.assignee && formik.errors.assignee}  */}
                        {/* <InputLabel id="system">System</InputLabel>
                        <Select sx={{ minWidth: 120 }}
                            labelId="system"
                            id="input"
                            name="system"
                            value={formik.values.system}
                            label="system"
                            onChange={formik.handleChange}
                            error={formik.touched.system && formik.errors.system}
                            helpertext={formik.touched.system && formik.errors.system}
                        >

                            {systems.map((system) => {
                                return (
                                    <MenuItem key={system._id} value={system.systemName}>{system.systemName}</MenuItem>
                                )
                            })}

                        </Select> */}



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
                            name="description"
                            label="description"
                            type="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && formik.errors.description}
                            helpertext={formik.touched.description && formik.errors.description}
                        />




                    </div>
                    <Button color="primary" onSubmit={formik.onSubmit} variant="contained" id="button_submit" type="submit">
                        Add Call
                    </Button>
                </form>
            }
        </>
    )
}