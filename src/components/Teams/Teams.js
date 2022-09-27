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

    // if (props.value === "System") {
    //     type = teams.teamMembers;
    //     console.log(true + " i am System");
    // } else if (props.value === "IT") {
    //     type =  teams.teamMembers;
    //     console.log(true + " i am It");
    // } else if (props.value === "SecOps") {
    //     type =  teams.teamMembers;
    //     console.log(true + " i am SecOps");
    // } else if (props.value === "Cyber") {
    //     type =  teams.teamMembers;
    //     console.log(true + " i am Cyber");
    // }

    // console.log(type);
    // if (type) {
    //     options = type.map((el) => <option key={el}>{el}</option>);
    // }
    // console.log(teams);


    // console.log(type);
    // console.log(options);


    return (
        <>
            {/* {!props.value ? */}
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


                {/* : */}
                {/* <>
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
                            team.teamMembers.map((teamName) => {
                                console.log(teamName);
                                return (
                                    <MenuItem key={teamName.userName} value={teamName.userName}>{teamName.userName}</MenuItem>

                                )
                            })
                            return (
                                <MenuItem key={team._id} value={team.teamName}>{team.teamName}</MenuItem>
                            )

                        })}
                    </Select>
                    <Select options={type}></Select> */}
                    {/* <>
                <InputLabel id="demo-simple-select-label">assignee</InputLabel>
                <Select sx={{ minWidth: 120 }}
                    labelId={props.labelIdAssignee}
                    id={props.idAssignee}
                    name={props.nameAssignee}
                    value={props.valueAssignee}
                    defaultValue={props.defaultValueAssignee}
                    onChange={props.onChangeAssignee}
                    error={props.errorAssignee}
                    helpertext={props.helpertextAssignee}
                >
                    {teams.map((team)=>{
                        team.teamMembers.map((teamName)=>{
                            <MenuItem key={teamName.userName} value={teamName.userName}>{teamName.userName}</MenuItem>

                        })
                    })}
                       


                </Select>


                
            </> */}

                    {/* <Assignee key={options}  labelId="assignee" id="input" name="assignee" value={options} defaultValue={options} onChange={changeSelectOptionHandler} error={props.error}  helpertext={props.helpertext} /> */}

                {/* </> */}

            {/* } */}

        </>

    )
}








{/* <Select sx={{ minWidth: 120 }}
                    labelId={props.labelId}
                    id={props.id}
                    name={props.name}
                    value={selected}
                    defaultValue={props.defaultValue}
                    error={props.error}
                    helpertext={props.helpertext}
                >
                    <MenuItem key={options} value={options}>{options}</MenuItem>
                       


                </Select> */}


{/* <select> */ }
{/* { */ }

{/* options */ }

{/* </select> */ }
{/* <InputLabel id="demo-simple-select-label">assignee</InputLabel> */ }
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
{/* {some} */ }
