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
console.log(props);
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
                        onChange={props.onChange}
                        error={props.error}
                        helpertext={props.helpertext}
                        setSelected={props.value}
                    >
                    <MenuItem key={""} value={""}>{""}</MenuItem>

                        {teams.map((team) => {
                            return (
                                <MenuItem key={team._id} value={team.teamName}>{team.teamName}</MenuItem>
                            )
                        })}
                    </Select>
                    {/* {!props.value ? null :
                        <TeamMembers/>
                    
                    } */}
                </>

        </>

    )
}