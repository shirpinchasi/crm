import React, { useState, useEffect,useContext } from "react";
import config from "../../config/index"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function TeamMembers(props){
  
    return(
        <div>
                        <InputLabel id="userName_Form">assignee</InputLabel>
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
                            {/* {props.teams.map((team) => {
                                
                                return (
                                    
                                    <MenuItem key={team._id} value={team.teamMembers}>{team.teamMembers}</MenuItem>
                                )
                            })} */}
                        

                        </Select>
        </div>
    )
}