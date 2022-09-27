import React, { useState, useEffect, useContext } from "react";
import config from "../../config/index"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TeamMembers from "./teamMembers";
// import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";
import Assignee from "./assignee";


export default function Teams(props) {
    const [teams, setTeams] = useState([]);
    const [selected, setSelected] = useState("");
    const [error, setError] = useState([])
    const [isMounted, setMounted] = useState(true);
 
  
    let type = null;
    let options = null;



    async function GetTeams() {
        const getTeams = await (await fetch(config.apiUrl + `/getTeams`, {
            method: "GET",
            credentials: "include",
        })).json()
        if (getTeams.status === 404) {
            // <ErrorDisplay error={getTeams.message} />
            setError(getTeams.message)
        } else {
            setTeams(getTeams)

        }
    }

    useEffect(() => {
        if (isMounted) {
            GetTeams();
        }
        return (() => {
            setMounted(false)
        })
    }, [])
    
    teams.map((team)=>{
        
    })


    return (
        <>

                <>
                    <InputLabel id="addUserForm">{props.labelId}</InputLabel>
                    <Select sx={{ minWidth: 120 }}
                        labelId={props.labelId}
                        id={props.id}
                        name={props.name}
                        value={props.value}
                        defaultValue={props.defaultValue}
                        label={props.labelId}
                        onChange={props.onChange}
                        error={props.error}
                        helpertext={props.helpertext}
                    >
                        
                        {teams.map((team) => {
                            return (
                                <MenuItem key={team._id} value={team.teamName}>{team.teamName}</MenuItem>
                            )
                        })}
                    </Select>
                </>

        </>

    )
}