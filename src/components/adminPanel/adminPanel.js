import { Box, Button, SliderTrack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./adminPanel.scss"
import { useFormik } from 'formik';
import config from "../../config/index"
// import { AddUserSchema } from '../Users/addUserSchema';
import { TextField } from '@mui/material';
import Backdrop from '@material-ui/core/Backdrop';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Teams from '../Teams/Teams';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';


export default function AdminPanel(props) {
  const { id } = useParams()
  const [isLoading, setLoading] = useState(true);
  const [getTeamName, setTeamName] = useState([])
  const [callsAmount, setCallsAmount] = useState([])
  const [openCalls,setOpenCalls] = useState("")
  const [isMounted, setMounted] = useState(true);
  const [getTeam, setTeam] = useState([]);
  const [error, setError] = useState("")
  const [redirectUrl, setRedirectUrl] = useState([])
 


  const filterModelByAssignee = {
    items: [
      { columnField: 'assignee', operatorValue: 'equals', value: props.props.userName },
      
    ]
  };
  const filterModelByTeam = {
    items: [
      { columnField: 'team', operatorValue: 'equals', value: props.props.team },
    ]
  };
  const filterModelByStatus = {
    items: [
      { columnField: 'status', operatorValue: 'equals', value: "Open"},
    ]
  };
  // console.log(openCalls);
 

  async function fetchCalls() {
    try {
      const getCalls = await (await fetch(config.apiUrl + `/getUserInfo`, {
        method: "GET",
        credentials: "include",
      })).json()
      setLoading(false)
      if (!error) {
        
        setTeamName(getCalls.teamName)
        setTeam(getCalls.teams.length)
        setCallsAmount(getCalls.calls.length)
        setOpenCalls(getCalls.calls.length)
        console.log(getCalls.calls);
      }
      setError(getCalls.message)
      
      
    } catch (err) {
      return err;
    }
  }
  console.log(openCalls);

 



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



  return (
    <>
      {isLoading ?
        <div>Loading</div>

        :
        <>
          
              <Box id="adminPanelBox">
                <Box id="AdminBox" sx={{ boxShadow: 3, borderRadius: '16px' }}>
                  <div>
                  <FontAwesomeIcon icon={faPen} />
                  </div>
                
                  <div id='boxHeader'>Calls On Me</div>
                  <Link to={`/Calls/`} state={{ filter: filterModelByAssignee}} >{callsAmount || 0}</Link>
                </Box>
                <Box id="AdminBox" sx={{ boxShadow: 3, borderRadius: '16px' }}>
                  <div>
                  <FontAwesomeIcon icon={faPen} />
                  </div>
                
                  <div id='boxHeader'>Open Calls On Me</div>
                  <Link to={`/Calls/`} state={{filter:filterModelByStatus }} >{openCalls || 0}</Link>
                </Box>
                <Box id="AdminBox" sx={{ boxShadow: 3, borderRadius: '16px' }}>
                  <div id='boxHeader'>Calls On My Team</div>
                  <Link to={`/Calls/`} state={{ filter: filterModelByTeam }} >{getTeam || 0}</Link>

                </Box>
                <Box id="AdminBox" sx={{ boxShadow: 3, borderRadius: '16px' }}>
                  <div id='boxHeader'>Requests On Me</div>
                  <Link to={`/Calls/`}>{0}</Link>

                </Box>

              </Box>
            </>
          }
        </>
  )
}