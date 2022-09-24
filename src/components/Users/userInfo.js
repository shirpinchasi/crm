import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import InfoIcon from '@mui/icons-material/Info';
import CheckIcon from '@mui/icons-material/Check';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import TextField from '@mui/material/TextField';
import "./userInfo.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Input, Tabs, CardContent, CardActions } from "@mui/material";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@material-ui/core";
import config from "../../config/index"
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { DataGrid } from "@mui/x-data-grid";
import Backdrop from '@material-ui/core/Backdrop';
import UpdateUser from "./updateUser";


function UserInfo(props) {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [calls, setCalls] = useState([])
  const [pageSize, setPageSize] = useState(25);
  const [info, setInfo] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [value, setValue] = useState('1');
  const [open, setOpen] = useState(false);
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleBackDropOpen = () => {
    setOpenBackDrop(true);
  };
  const handleBackDropClose = () => {
    setOpenBackDrop(false);
  };





  async function fetchUser() {
    try {
      const getUsers = await fetch(config.apiUrl + `/getUser/${id}`, {
        method: "GET",
        credentials: "include",
      })
      const fetchUser = await getUsers.json();
      setUsers(fetchUser.user)
      setLoading(false)
    } catch (err) {
      throw err;
    }
  }

  async function fetchCalls() {
    try {
      const getCalls = await fetch(config.apiUrl + `/getCallsPerUser/${id}`, {
        method: "GET",
        credentials: "include",
      })
      const fetchCalls = await getCalls.json();
      setCalls(fetchCalls)
      setLoading(false)
    } catch (err) {
      throw err;
    }
  }




  useEffect(() => {
    setLoading(true)
    fetchUser()
    fetchCalls()
  }, [])
console.log(props);

  const columns = [
    {
      field: '_id', headerName: "Call Id", width: 100, renderCell: (cellValues) => {
        return <Link to={`/CallInfo/${cellValues.value}`}>{cellValues.value}</Link>;
      }
    },
    { field: "userName", headerName: "userName", width: 150 },

    { field: "system", headerName: "System", width: 150 },

    // {
    //   field: "email", headerName: "Email", width: 150, renderCell: (params) => (
    //     <a href={`mailto:${params.value}`}>{params.value}</a>
    //   )
    // },
    {
      field: "status", headerName: "Status", width: 130, renderCell: (value) => {
        if (value.value === "Open") {
          return <div>
            <Chip icon={<InfoIcon color="primary" />} label={value.value} color="primary" variant="outlined" />

          </div>
        }
        else if (value.value === "Closed") {
          return <div>
            <Chip icon={<CheckIcon color="success" />} label={value.value} color="success" variant="outlined" />
          </div>
        }

        else if (value.value === "In Progress") {
          return <div>
            <Chip icon={<AutorenewIcon color="warning" />} label={value.value} color="warning" variant="outlined" />
          </div>
        }
      }
    },
    { field: "description", headerName: "Description", width: 200 },
    { field: "openingDate", headerName: "opening date", width: 200 },
  ];
console.log(openBackDrop);
  return (
    <>
      {isLoading ? <div>Loading</div> :
        <Box className="tabs" sx={{ width: '90%', typography: 'body1' }}>
          <TabContext value={value} centered>
            <Box className="tabs" sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList id="tabList" onChange={handleChange} >
                <Tab  label="User Properties" value="1" />
                <Tab label="Item Two" value="2" />
                <Tab label="Calls" value="3" />
              </TabList>
            </Box>
            
            <TabPanel className="tab" id="TabPanel" value="1">
            <Button onClick={handleBackDropOpen}>Update User</Button>
            {openBackDrop === true ? 
            <Backdrop open={openBackDrop}>
              <Card id="backdropUpdate" >
              <CardContent>
                  <CardActions>
                    <FontAwesomeIcon icon={faTimes} onClick={handleBackDropClose} />
                  </CardActions>
                  </CardContent>
                  <UpdateUser lastUpdater={props.props.userName} userName={users.userName}/>
              </Card>
            </Backdrop>
            
            
            
            : 
              <Card id="Card_Call">
                <div className="call_header">
                  <TextField
                    disabled
                    id="employeeId"
                    label="employee Id"
                    defaultValue={users.employeeId}
                    variant="standard"
                  />
                  
                </div>
                <div className="callInfo">
                  <TextField
                    disabled
                    id="standard-disabled"
                    label="UserName"
                    defaultValue={users.userName}
                    variant="standard"
                  />
                  <TextField
                    disabled
                    id="standard-disabled"
                    label="Email"
                    defaultValue={users.email}
                    variant="standard"
                  />
                  <TextField
                    disabled
                    id="standard-disabled"
                    label="Opening Date"
                    defaultValue={users.openingDate}
                    variant="standard"
                  />
                  <TextField
                    disabled
                    id="standard-disabled"
                    label="Status"
                    defaultValue={users.status}
                    variant="standard"
                  />
                </div>


              </Card>
}
            </TabPanel>


            <TabPanel id="TabPanel" value="2">Item Two</TabPanel>
            <TabPanel id="TabPanel" value="3">
              <div style={{ height: 540, width: '100%' }}>


                <DataGrid
                  columns={columns}
                  getRowId={(row) => row._id}
                  rows={calls.calls}
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[25, 50, 100]}
                  pagination
                  //  initialState={{
                  //   rowGrouping: {
                  //     model: INITIAL_GROUPING_COLUMN_MODEL,
                  //   },
                  // }}
                  disableSelectionOnClick
                />



              </div>
            </TabPanel>
          </TabContext>
        </Box>
      }
    </>
  )
}

export default UserInfo;