import React, { useContext, useEffect, useState } from "react";
import { SystemSchema } from "./systemSchema";
import config from "../../config/index"
import { Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import "./NewSystems.scss";
import GetUsers from "../Users/getUsers";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TeamMembers from "../Teams/teamMembers";



export default function NewSystem(props) {

    const [getError, setError] = useState("")


    const formik = useFormik({
        initialValues: {
            systemName: "",
            systemManager: ""
        },


        validationSchema: SystemSchema,
        onSubmit: async (values) => {
            const res = await fetch(config.apiUrl + "/addSystem", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(values),

            })
            let result = await res.json();
            setError(result.message)
            if (res.status === 201) {
                console.log(res.status);
                 window.location.reload()
                
            } if (res.status === 409) {
                let result = await res.json();
                setError(result.message)
            }
            

        },

    });

    return (
        <>
            {props.props === false ? null :
                <form id='form_submit' onSubmit={formik.handleSubmit}>
                    <div id="flex_inputs">
                        <div>
                            <GetUsers label="system Manager" labelId="systemManager" id="input" name="systemManager" value={formik.values.systemManager} onChange={formik.handleChange} error={formik.touched.systemManager && formik.errors.systemManager} helpertext={formik.touched.systemManager && formik.errors.systemManager} />
                        </div>

                        <TextField
                            id="input"
                            name="systemName"
                            label="system Name"
                            type="systemName"
                            value={formik.values.systemName}
                            onChange={formik.handleChange}
                            error={formik.touched.systemName && formik.errors.systemName}
                            helpertext={formik.touched.systemName && formik.errors.systemName}
                        />




                    </div>
                    <div className="Error">{getError}</div>
                    <Button color="primary" onSubmit={formik.onSubmit} variant="contained" id="button_submit" type="submit">
                        Add System
                    </Button>
                </form>
            }
        </>
    )
}