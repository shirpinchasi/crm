import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./CallInfo.scss"
import { Button } from "@material-ui/core";
import config from "../../config/index"
import { Card, Tabs } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';



function CallInfo() {
  const { id } = useParams();
  const [calls, setCalls] = useState([]);
  const [info, setInfo] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [selectedFile, setSelectedFile] = useState([]);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function fetchCalls() {
    try {
      const getCalls = await fetch(config.apiUrl + `/getCalls/${id}`, {
        method: "GET",
        credentials: "include",
      })
      const fetchCalls = await getCalls.json();
      setCalls(fetchCalls.call)
      setLoading(false)
    } catch (err) {
      console.log(err);
    }
  }

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  async function handleSubmission() {
    const formData = new FormData();

    formData.append('File', selectedFile);
    const uploadData = await fetch(config.apiUrl + `/uploadPicture/${id}`, {
      method: "PUT",
      credentials: "include",
      body: formData
    })
    const fetchData = await uploadData.json()
    setInfo(fetchData)
  };

  useEffect(() => {
    setLoading(true)
    fetchCalls()
  }, [])

  return (
    <>
      {isLoading ? <div>Loading</div> :
        <Box className="tabs" sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value} centered>
            <Box className="tabs" sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList id="tabList" onChange={handleChange} >
                <Tab label="Call Properties" value="1" />
                <Tab label="Item Two" value="2" />
                <Tab label="AddOns" value="3" />
              </TabList>
            </Box>
            <TabPanel id="TabPanel" value="1">
              <Card id="Card_Call">
                <div className="call_header">
                  <TextField
                    disabled
                    id="call_id"
                    label="Call Id"
                    defaultValue={calls.CallId}
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
                  <TextField
                    disabled
                    id="standard-disabled"
                    label="Disabled"
                    defaultValue="Hello World"
                    variant="standard"
                  />
                </div>


              </Card>
            </TabPanel>


            <TabPanel id="TabPanel" value="2">Item Two</TabPanel>
            <TabPanel id="TabPanel" value="3">
              <input type="File" name="File" onChange={changeHandler} />
              <div>
                <button onClick={handleSubmission}>Submit</button>

              </div>
              {!calls.picture ? null
                :
                <div>
                  <p>Filename: {calls.picture.fileName}</p>
                  <p>
                    Upload Date : {calls.picture.uploadDate}
                  </p>
                  <a href={`data:${calls.picture.contentType};base64,${calls.picture.image}`} download >{calls.picture.fileName}</a>
                </div>
              }










            </TabPanel>
          </TabContext>
        </Box>
      }
    </>
  )
}

export default CallInfo;