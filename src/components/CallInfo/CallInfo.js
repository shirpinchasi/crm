import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./CallInfo.scss"
import { DataGrid, GridToolbarExport, GridToolbarContainer } from "@mui/x-data-grid";
import { Button } from "@material-ui/core";
import config from "../../config/index"
import { Card, Input, Tabs, CardContent, CardActions } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Backdrop from '@material-ui/core/Backdrop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewCall from "../Calls/newCall"
import { faTimes } from "@fortawesome/free-solid-svg-icons";



function CallInfo() {
  const { id } = useParams();
  const [calls, setCalls] = useState([]);
  const [userName, setUserName] = useState([]);
  const [system, setSystem] = useState([]);
  const [goremMetapel, setGoremMetapel] = useState([]);
  const [team, setTeam] = useState([]);
  const [status, setStatus] = useState([]);
  const [description, setDescription] = useState([])
  const [info, setInfo] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [selectedFile, setSelectedFile] = useState([]);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [value, setValue] = useState('1');
  const [some, setSome] = useState([])
  const [open, setOpen] = useState(false);
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const [update, setUpdate] = ([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleBackDropOpen = () => {
    setOpenBackDrop(true);
  };
  const handleBackDropClose = () => {
    setOpenBackDrop(false);
    setUserName("")
    setSystem("")
    setGoremMetapel("")
    setTeam("")
    setStatus("")
    setDescription("")
  };

  async function fetchCalls() {
    const getCalls = await (await fetch(config.apiUrl + `/getCalls/${id}`, {
      method: "GET",
      credentials: "include",
    })).json()
    console.log(getCalls.call);
    setCalls(getCalls.call)
    setLoading(false)
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

  const columns = [
    { field: "fileName", headerName: "File Name", width: 250 },
    {
      field: "image", headerName: "File", width: 250, renderCell: (cellValues) => {
        return <a href={`data:${cellValues.row.contentType};base64,${cellValues.row.image}`} download >{cellValues.row.fileName}</a>;
      }
    },
    { field: "uploadDate", headerName: "Upload Date", width: 250 },
    {
      field: "Action", headerName: "Delete", key: "Action", width: 150, renderCell: (id) => (
        <>
          <Button
            style={{
              backgroundColor: "#e8605d",
              padding: "3px 35px"
            }}
            onClick={() => handleDelete(id)}
            variant="contained"
            color="primary"
            type="submit"
          >
            Delete
          </Button>
        </>
      )
    }
  ]

  const getCellActions = (column, row) => {
    const cellActions = [
      {
        icon: <span className="glyphicon glyphicon-remove" />,
        callback: () => {
          const rows = calls.picture;
          rows.splice(row.index, 1); //
          this.setState({ rows: rows });
        }
      }
    ];
    return column.key === "action" ? cellActions : null;
  };

  async function handleDelete(id) {
    console.log(id);
    try {
      const deleteFile = await (await fetch(config.apiUrl + `/deleteFile/${id.id}`, {
        method: "DELETE",
        credentials: "include",
      })).json()
      setSome(deleteFile)
      setLoading(true)

    } catch (err) {
      console.log(err);
    }
  }
  async function updateCall() {
    try {
      const updateCall = await (await fetch(config.apiUrl + `/updateCall/${id}`, {
        method: "PUT",
        credentials: "include",
      })).json()
      setUpdate(updateCall)
      setLoading(true)

    } catch (err) {
      console.log(err);
    }
  }



  return (
    <>
      {isLoading ? <div>Loading</div> :
        <Box className="tabs" sx={{ width: '100%', typography: 'body1' }}>
          {openBackDrop === true ?
          <Backdrop open={openBackDrop}>
          <Card id="backdropUpdate" >
            <CardContent>
              <CardActions>
                <FontAwesomeIcon icon={faTimes} onClick={handleBackDropClose} />
              </CardActions>
              <NewCall onSubmit={updateCall} onClick={handleBackDropClose} />
            </CardContent>
          </Card>
          </Backdrop> 
          :
          <TabContext value={value} centered>
            <Box className="tabs" sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList id="tabList" onChange={handleChange} >
                <Tab label="Call Properties" value="1" />
                <Tab label="Item Two" value="2" />
                <Tab label="AddOns" value="3" />
              </TabList>
            </Box>
              <Button onClick={handleBackDropOpen}>Update Call</Button>
                <TabPanel id="TabPanel" value="1">
                  <Card id="Card_Call">
                    <div className="call_header">
                      <TextField
                        disabled
                        id="call_id"
                        label="Call Id"
                        defaultValue={id}
                        variant="standard"
                      />
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
              <input type="File" multiple="multiple" name="File" onChange={changeHandler} />
              <div>
                {isFilePicked ?
                  <Button onClick={handleSubmission}>Submit</Button>
                  : <div>Please Pick A File</div>}
                {!calls.picture ? null :
                  <div style={{ height: 500, width: "100%" }}>

                    <DataGrid

                      rows={{ id: calls.picture.id }, calls.picture}
                      columns={columns}
                      pageSize={25}
                      getCellActions={getCellActions}
                    />

                  </div>
                }
                {/* {calls.picture.map((file)=>(
                  
              
                  <div>
                     <p>Filename: {file.fileName}</p>
                     <p>
                     Upload Date : {file.uploadDate}
                   </p>
                   <a href={`data:${file.contentType};base64,${file.image}`} download >{file.fileName}</a>
                   </div>
                ))} */}



              </div>

            </TabPanel>
          </TabContext>
}
        </Box>
      }
    </>
  )
}

export default CallInfo;