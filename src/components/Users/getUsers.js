import React, { useEffect,useState } from "react";
import config from "../../config/index"
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import "./GetUsers.scss"

function GetUsers(props){
    const [users, setUsers] = useState([]);
    const [isMounted,setMounted] = useState(true);

    async function getUsers() {
        const getUser = await (await fetch(config.apiUrl + `/getUser`, {
            method: "GET",
            credentials: "include",
        })).json()
        setUsers(getUser)
    }

    useEffect(()=>{
        if(isMounted){
            getUsers()
        }
        return(()=>{
            setMounted(false)
        })
    },[])
    

    return(
        <>
        <InputLabel id="userName_Form">userName</InputLabel>
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
