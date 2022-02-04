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
    const { id } = useParams()
    const [calls, setCalls] = useState([])
    console.log(id);

    async function fetchCalls() {
        try {
            const getCalls = await fetch( config.apiUrl +  `/getCalls/${id}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            })
            const fetchCalls = await getCalls.json();
            setCalls(fetchCalls.call)
            console.log(fetchCalls.call);
        } catch (err) {
            console.log(err);
        }
    }

    // console.log(calls);


    useEffect(() => {
        fetchCalls()
    }, [])



    return (
        <>
            <div className="call_header">
                <p className="call_id">Call Id : {calls._id}</p>
                <Button>Update Call</Button>
            </div>

            <Box className="callInfo">
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
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Disabled"
          defaultValue="Hello World"
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Disabled"
          defaultValue="Hello World"
          variant="standard"
        />
                <FormControl className="Form_Control" disabled variant="standard">
                    <InputLabel htmlFor="component-disabled">userName</InputLabel>
                    
                    <Input id="component-disabled" value={calls.userName}/>
                </FormControl>
                <FormControl className="Form_Control" disabled variant="standard">
                    <InputLabel htmlFor="component-disabled">System</InputLabel>
                    <Input id="component-disabled" value={calls.system} />
                </FormControl>
                <FormControl className="Form_Control" disabled variant="standard">
                    <InputLabel htmlFor="component-disabled">Opening Date</InputLabel>
                    <Input id="component-disabled" value={calls.openingDate} />
                </FormControl>
                <FormControl className="Form_Control" disabled variant="standard">
                    <InputLabel htmlFor="component-disabled">Description</InputLabel>
                    <Input id="component-disabled" value={calls.description} />
                </FormControl>

            </Box>

        </>
    )
}

export default CallInfo;