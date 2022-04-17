import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./userInfo.scss"
import { Button } from "@material-ui/core";
import config from "../../config/index"
import { Card, Tabs } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';



function UserInfo() {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [info, setInfo] = useState([])
  const [isLoading, setLoading]=useState(true)
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
      console.log(err);
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchUser()
  }, [])

  return (
        <>
        {isLoading ? <div>Loading</div> :    
          <Box className="tabs" sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value} centered>
              <Box className="tabs" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList id="tabList" onChange={handleChange} >
                  <Tab label="User Properties" value="1" />
                  <Tab label="Item Two" value="2" />
                  <Tab label="AddOns" value="3" />
                </TabList>
              </Box>
              <TabPanel id="TabPanel" value="1">
                <Card id="Card_Call">
                  <div className="call_header">
                    <TextField
                      disabled
                      id="employeeId"
                      label="employee Id"
                      defaultValue={users.employeeId}
                      variant="standard"
                    />
                    <Button>Update User</Button>
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
              </TabPanel>


              <TabPanel id="TabPanel" value="2">Item Two</TabPanel>
              <TabPanel id="TabPanel" value="3">
                <div>
                  
                {users.calls.map((call)=>{
                  return <div>{call.userName},{call.system}</div>
                })}
            </div>
            </TabPanel>
          </TabContext>
        </Box>
}
        </>
  )
}

export default UserInfo;