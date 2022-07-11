import React, { useEffect, useState } from "react";
import config from "../../config/index"
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate } from "react-router-dom";
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";

function GetSystems(props) {
    const [systems, setSystems] = useState([]);
    const [error, setError] = useState("")
    const [isLoading, setLoading] = useState(true);
    const [isMounted, setMounted] = useState(true);
    const history = useNavigate();

    async function getSystems() {
        const getSystem = await (await fetch(config.apiUrl + `/system`, {
            method: "GET",
            credentials: "include",
        })).json()
        if (getSystem.status === 401) {
            <ErrorDisplay error={getSystem.message}/>
            console.log("stuck here");
            setError(getSystem.message)
        }else{
            console.log(getSystem);
            setSystems(getSystem)
            
        }
        
    }

    useEffect(() => {
            if (isMounted) {
                getSystems();
                console.log(systems);
                console.log(isMounted);
                console.log("here");
            }
            return (() => {
                setMounted(false)
                console.log(systems);
                console.log("got the data");
            })
        
        

    }, [])

    return (
        <>
            <InputLabel id="System">System</InputLabel>
            <Select sx={{ minWidth: 120 }}
                labelId={props.labelId}
                id={props.id}
                name={props.name}
                value={props.value}
                defaultValue={props.defaultValue}
                onChange={props.onChange}
                error={props.error}
                helpertext={props.helpertext}
            >
                {systems.map((system) => {
                    return (
                        <MenuItem key={system._id} value={system.systemName}>{system.systemName}</MenuItem>
                    )
                })}


            </Select>

        </>
    )
}
export default GetSystems;
