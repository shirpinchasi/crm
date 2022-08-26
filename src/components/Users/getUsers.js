import React, { useEffect, useState } from "react";
import config from "../../config/index"
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import "./GetUsers.scss"
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";


function GetUsers(props, types) {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("")
    const [isMounted, setMounted] = useState(true);
    const [isLoading, setLoading] = useState(true);

    async function getUsers() {
        try {
            const getUser = await (await fetch(config.apiUrl + `/getUser`, {
                method: "GET",
                credentials: "include",
            })).json()
            setLoading(false)
            if (!error) {
                setUsers(getUser)
            }
            setError(getUser.message)
        } catch (err) {
            throw err;
        }
    }
    useEffect(() => {
        if (!error) {
            if (isMounted) {
                getUsers()
            }
            return (() => {
                setMounted(false)
            })
        }

        // <div>{error}</div>
    }, [])
    return (
        <>
            <InputLabel id="userName_Form">{props.label}</InputLabel>
            <Select sx={{ minWidth: 120 }}
                labelId={props.labelId}
                id={props.id}
                name={props.name}
                value={props.value}
                defaultValue={props.defaultValue}
                label={props.label}
                onChange={props.onChange}
                error={props.error}
                helpertext={props.helpertext}
            >
                {users.map((user) => {
                    return (
                        <MenuItem key={user._id} value={user.userName}>{user.userName}</MenuItem>
                    )
                })}


            </Select>


        </>
    )
}
export default GetUsers;
