import { Call } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import "./CallInfo.scss"
import { Button } from "@material-ui/core";
import config from "../../config/index"



function CallInfo() {
    const { id } = useParams();
    const [calls, setCalls] = useState([]);
    const [isLoading, setLoading] = useState(true);
    console.log(id);

    async function fetchCalls() {
        try {
            const getCalls = await fetch( config.apiUrl +  `/getCalls/${id}`, {
                method: "GET",
                credentials:"include",
            })
            const fetchCalls = await getCalls.json();
            setCalls(fetchCalls.call)
            setLoading(false)
            console.log(fetchCalls.call);
        } catch (err) {
            console.log(err);
        }
    }

    console.log(calls.userName);


    useEffect(() => {
        fetchCalls()
    }, [])



    return (
        <>
        {isLoading ? <div>Loading dataaaaaaaaaaaa</div> : 
        <>
            <div className="call_header">
            <TextField
          disabled
          id="call_id"
          label="UserName"
          defaultValue={calls._id}
          variant="standard"
        />
                <Button>Update Call</Button>
            </div>
            <div className="callInfo">
            <TextField
          disabled
          id="standard-disabled"
          label="UserName"
          defaultValue={calls.userName}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="System"
          defaultValue={calls.system}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Opening Date"
          defaultValue={calls.openingDate}
          variant="standard"
        />
        {/* <TextField
          disabled
          id="standard-disabled"
          label="Disabled"
          defaultValue="Hello World"
          variant="standard"
        /> */}
        
            </div>
            </>
}
        </>
    )
}

export default CallInfo;