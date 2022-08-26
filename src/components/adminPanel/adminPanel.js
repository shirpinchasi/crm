import { Box, Button, SliderTrack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./adminPanel.scss"
import { useFormik } from 'formik';
import config from "../../config/index"
import { AddUserSchema } from './addUserSchema';
import { TextField } from '@mui/material';
import Backdrop from '@material-ui/core/Backdrop';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
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
  const [isMounted, setMounted] = useState(true);
  const [getTeam, setTeam] = useState([]);
  const [open, setOpen] = useState(false);
  const [newUserError, setNewUserError] = useState("")
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const [error, setError] = useState("")
  const handleBackDropOpen = () => {
    setOpenBackDrop(true);
  };
  const handleBackDropClose = () => {
    setOpenBackDrop(false);
  };




  const filterModelByAssignee = {
    items: [
      { columnField: 'assignee', operatorValue: 'equals', value: props.props.userName },
    ]
  };
  const filterModelByTeam = {
    items: [
      { columnField: 'team', operatorValue: 'isAnyOf', value: getTeamName },
    ]
  };

  async function fetchCalls() {
    try {
      const getCalls = await (await fetch(config.apiUrl + `/getUserInfo/${id}`, {
        method: "GET",
        credentials: "include",
      })).json()
      const getTeamCalls = await (await fetch(config.apiUrl + `/getCallsPerTeam/${id}`, {
        method: "GET",
        credentials: "include"
      })).json()
      setLoading(false)
      if (!error) {
        setTeamName(getTeamCalls.teamName)
        setTeam(getTeamCalls.teams.length)
        setCallsAmount(getCalls.calls.length)
      }
      setError(getCalls.message)
    } catch (err) {
      return err;
    }
  }

  const formik = useFormik({
    initialValues: {
      userName: "",
      firstName: "",
      lastName: "",
      status: "Active",
      roles: "",
      email: "",
      team: ""
    },


    validationSchema: AddUserSchema,
    onSubmit: async (values) => {
      await fetch(config.apiUrl + "/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(values),

      })
      window.location.reload()
        .then((response) => {
          response.json().then((res) => {
            setNewUserError(res.message)
          })
        })
    },

  });



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


  return (
    <>
      {isLoading ?
        <> <div>Loading</div><div>Loading</div><div>Loading</div><div>Loading</div><div>Loading</div><div>Loading</div><div>Loading</div><div>Loading</div></>

        :
        <>
          <div id='menuAdmin'>
          </div>
          {openBackDrop ?
            <Backdrop open={openBackDrop}>
              <Card id="backdrop" >
                <CardContent>
                  <CardActions>
                    <FontAwesomeIcon icon={faTimes} onClick={handleBackDropClose} />
                  </CardActions>
                  <form id='form_submit' onSubmit={formik.handleSubmit}>
                    <div id="flex_inputs">
                      <TextField
                        id="input"
                        name="userName"
                        label="userName"
                        type="userName"
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                        error={formik.touched.status && formik.errors.userName}
                        helpertext={formik.touched.userName && formik.errors.userName}
                      />

                      <TextField
                        id="input"
                        name="firstName"
                        label="firstName"
                        type="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={formik.touched.firstName && formik.errors.firstName}
                        helpertext={formik.touched.firstName && formik.errors.firstName}
                      />
                      <TextField
                        id="input"
                        name="lastName"
                        label="lastName"
                        type="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && formik.errors.lastName}
                        helpertext={formik.touched.lastName && formik.errors.lastName}
                      />
                      <TextField
                        disabled
                        id="input"
                        name="status"
                        label="status"
                        type="status"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        error={formik.touched.status && formik.errors.status}
                        helpertext={formik.touched.status && formik.errors.status}
                      />
                      <TextField
                        id="input"
                        name="email"
                        label="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && formik.errors.email}
                        helpertext={formik.touched.email && formik.errors.email}
                      />
                      <Select sx={{ minWidth: 120 }}
                        labelId="Role"
                        id="roles"
                        name="roles"
                        value={formik.values.roles}
                        label="roles"
                        onChange={formik.handleChange}
                        error={formik.touched.roles && formik.errors.roles}
                        helpertext={formik.touched.roles && formik.errors.roles}
                      >
                        {/* {formik.values.roles.map((role) => {
                    return ( */}
                        <MenuItem key={"user"} value={"user"}>{"user"}</MenuItem>
                        <MenuItem key={"admin"} value={"admin"}>{"admin"}</MenuItem>
                    {/* ) */}
                {/* })} */}

                      </Select>
                      {/* <TextField
                            id="input"
                            name="roles"
                            label="roles"
                            type="roles"
                            value={formik.values.roles}
                            onChange={formik.handleChange}
                            error={formik.touched.roles && formik.errors.roles}
                            helpertext={formik.touched.roles && formik.errors.roles}
                        /> */}
                      <Teams labelId="teams" id="input" name="team" value={formik.values.team} onChange={formik.handleChange} error={formik.touched.team && formik.errors.team} helpertext={formik.touched.team && formik.errors.team} />

                      {/* <TextField
                            id="input"
                            name="team"
                            label="team"
                            type="team"
                            value={formik.values.team}
                            onChange={formik.handleChange}
                            error={formik.touched.team && formik.errors.team}
                            helpertext={formik.touched.team && formik.errors.team}
                        /> */}




                    </div>
                    <div id='error'>{newUserError}</div>
                    <Button color="primary" onSubmit={formik.onSubmit} variant="contained" id="button_submit" type="submit">
                      Add User
                    </Button>
                  </form>

                </CardContent>
              </Card>
            </Backdrop>


            :

            <>
              <Button onClick={handleBackDropOpen} id='addUser'>
                Add User
              </Button>

              <Box id="adminPanelBox">
                <Box id="AdminBox" sx={{ boxShadow: 3, borderRadius: '16px' }}>
                  <div id='boxHeader'>Calls On Me</div>
                  <Link to={`/Calls/`} state={{ filter: filterModelByAssignee }} >{callsAmount || 0}</Link>
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

      }
    </>
  )
}