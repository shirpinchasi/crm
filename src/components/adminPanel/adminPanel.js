import { Box, SliderTrack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./adminPanel.scss"
import config from "../../config/index"


export default function AdminPanel(props){
    const {id} = useParams()
    const [isLoading, setLoading] = useState(true);
    const [getTeamName,setTeamName] = useState([])
    const [callsAmount,setCallsAmount] = useState([])
    const [isMounted, setMounted] = useState(true);
    const [getTeam, setTeam] = useState([]);
    const [error,setError] = useState("")
    const filterModelByAssignee = {
        items: [
          {columnField: 'assignee', operatorValue: 'equals', value: props.props.userName },
        ]
      };
      const filterModelByTeam = {
        items:[
            {columnField: 'team', operatorValue: 'isAnyOf', value: getTeamName },
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
          const getTeamCalls = await(await fetch(config.apiUrl + `/getCallsPerTeam/${id}`,{
            method:"GET",
            credentials:"include"
          })).json()
          setLoading(false)
          if (!error) {
            setTeamName(getTeamCalls.teamName)
            setTeam(getTeamCalls.teams.length)
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
                // props.props.team.map((team)=>{
                //     setTeamName(team.teamName)
                // })
            })
        }
    
    
    }, [])


    return(
        <>
        {isLoading && <div>Loading</div>}
        <Box id="adminPanelBox">
        <Box id="AdminBox" sx={{ boxShadow: 3, borderRadius: '16px' }}>
            <div id='boxHeader'>Calls On Me</div>
            <Link to={`/Calls/`} state={{filter: filterModelByAssignee}} >{callsAmount || 0}</Link>
        </Box>
        <Box id="AdminBox" sx={{ boxShadow: 3 , borderRadius: '16px'}}>
            <div id='boxHeader'>Calls On My Team</div>
            <Link to={`/Calls/`} state={{filter: filterModelByTeam}} >{getTeam || 0}</Link>

        </Box>
        <Box id="AdminBox" sx={{ boxShadow: 3 , borderRadius: '16px'}}>
            <div id='boxHeader'>Requests On Me</div>
            <Link to={`/Calls/`}>{ 0}</Link>

        </Box>
        
        </Box>
        </>
    )
}