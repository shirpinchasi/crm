import React, { useEffect,useState } from "react";
import config from "../../config/index"
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';


function GetSystems(props){
    const [systems, setSystems] = useState([]);
    const [isMounted,setMounted] = useState(true);


    async function getSystems() {
        const getSystem = await (await fetch(config.apiUrl + `/system`, {
            method: "GET",
            credentials: "include",
        })).json()
        setSystems(getSystem)
    }

    useEffect(()=>{
        if(isMounted){
            getSystems();
        }
        return(()=>{
            setMounted(false)
        })
        
    },[])
    

    return(
        <>
        <InputLabel id="System">System</InputLabel>
                        <Select sx={{ minWidth: 120 }}
                            labelId={props.labelId}
                            id={props.id}
                            name={props.name}
                            value={props.value}
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
