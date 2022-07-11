import React, { useState, useEffect, useContext } from "react";
import config from "../../config/index"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TeamMembers from "./teamMembers";

export default function Teams(props) {
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState([])
    const [isMounted, setMounted] = useState(true);

    useEffect(() => {
        
        if (!error) {
            if (isMounted) {
                GetTeams();
            }
            return (() => {
                setMounted(false)
            })
        }


    }, [])

    async function GetTeams() {
        const getUser = await (await fetch(config.apiUrl + `/getTeams`, {
            method: "GET",
            credentials: "include",
        })).json()
        if (!error) {
            setTeams(getUser)
        }
        setError(getUser.message)

    }
    const some = teams.map((t) => {
        console.log(t);
        if (t.teamMembers.length === 0) {
            return null
        }
    })
    return (
        <div>
            {!error ?
                <>
                    <InputLabel id="demo-simple-select-label">team</InputLabel>
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
                        {teams.map((team) => {

                            return (
                                <MenuItem key={team._id} value={team.teamName}>{team.teamName}</MenuItem>
                            )

                        })}


                    </Select>
                    <InputLabel id="demo-simple-select-label">assignee</InputLabel>
                    {/* <Select labelId={props.labelIdTeam}
                        id={props.idTeam}
                        name={props.nameTeam}
                        value={props.valueTeam}
                        onChange={props.onChangeTeam}
                        error={props.errorTeam}
                        helpertext={props.helpertextTeam}
                    >
                        {teams.map((team) => {
                            // {
                            //     if (team.teamMembers.length === 0) {
                            //         return "hello"
                            //     }
                            return (
                                <MenuItem key={team._id} value={team.teamMembers}>{team.teamMembers}</MenuItem>
                            )
                            // }


                        })}
                    </Select> */}
                    {some}
                </>
                :
                <>
                    {error}
                </>
            }
        </div>

    )
}