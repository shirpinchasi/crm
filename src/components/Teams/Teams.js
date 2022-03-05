import React, { useState, useEffect,useContext } from "react";
import config from "../../config/index"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function Teams(props){
    const [teams, setTeams] = useState([]);
    const [isMounted,setMounted] = useState(true);

    useEffect(()=>{
        if(isMounted){
            GetTeams();
        }

        return(()=>{
            setMounted(false)
        })
        
    },[])

    async function GetTeams() {
        const getUser = await (await fetch(config.apiUrl +  `/getTeams`, {
            method: "GET",
            credentials:"include",
        })).json()
        setTeams(getUser)
    }
    return(
        <div>
            <InputLabel id="demo-simple-select-label">team</InputLabel>
            <Select sx={{ minWidth: 120 }}
                            labelId={props.labelId}
                            id={props.id}
                            name={props.name}
                            value={props.value}
                            label={props.name}
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
        </div>
    )
}