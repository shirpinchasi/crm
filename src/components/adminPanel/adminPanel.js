import { Box, SliderTrack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./adminPanel.scss"
import config from "../../config/index"


export default function AdminPanel(props){
    const {id} = useParams()
    const [isLoading, setLoading] = useState(true);
    const [calls,setCalls] = useState([])
    const [callsAmount,setCallsAmount] = useState([])
    const [isMounted, setMounted] = useState(true);
    const [error,setError] = useState("")
    const filterModel = {
        items: [
          {columnField: 'assignee', operatorValue: 'equals', value: props.props.userName },
        ],
        byTeam:[
            {columnField: 'team', operatorValue: 'equals', value: props.props.team },
        ]
      };
    //   console.log(props.props.team[0].teamName);
    // async function GetInfo(){
    //     try{
    //         if(!error){
    //             setCalls(props.props.calls)
    //         }
    //         console.log(error);
    //     }catch(err){
    //         console.log(err);
    //     }
    // }


    async function fetchCalls() {
        try {
          const getCalls = await(await fetch(config.apiUrl + `/getUserInfo/${id}`, {
            method: "GET",
            credentials: "include",
          })).json()
          setLoading(false)
          if (!error) {
            setCallsAmount(getCalls.calls.length)
        }
        setError(getCalls.message)
        } catch (err) {
          console.log(err);
        }
      }
      useEffect(() => {
            
        if (!error) {
            if (isMounted) {
                fetchCalls();
                
            }
            return (() => {
                setMounted(false)
            })
        }
    
    
    }, [])
//  console.log(calls);

    return(
        <>
        {/* {isLoading && <div>Loading</div>} */}
        <Box id="adminPanelBox">
        <Box id="AdminBox" sx={{ boxShadow: 3, borderRadius: '16px' }}>
            <div id='boxHeader'>Calls On Me</div>
            <Link to={`/Calls/`} state={{filter: filterModel}} >{callsAmount || 0}</Link>
        </Box>
        <Box id="AdminBox" sx={{ boxShadow: 3 , borderRadius: '16px'}}>
            <div id='boxHeader'>Calls On My Team</div>
            <Link to={`/Calls/`} state={{filter: filterModel.byTeam}} >{0}</Link>

        </Box>
        <Box id="AdminBox" sx={{ boxShadow: 3 , borderRadius: '16px'}}>
            <div id='boxHeader'>Requests On Me</div>
            <Link to={`/Calls/`}>{ 0}</Link>

        </Box>
        
        </Box>
        </>
    )
}