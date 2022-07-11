import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./CallInfo.scss"
import { DataGrid, GridToolbarExport, GridToolbarContainer,GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";
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
import { UpdateSchema } from "./updateCallScema";
import { Field, useFormik } from 'formik';
import LinearProgress from '@mui/material/LinearProgress';
import GetUsers from "../Users/getUsers";
import GetSystems from "../Systems/GetSystems";
import Teams from "../Teams/Teams";
import Chip from '@mui/material/Chip';
import InfoIcon from '@mui/icons-material/Info';
import CheckIcon from '@mui/icons-material/Check';
import AutorenewIcon from '@mui/icons-material/Autorenew';



function CallInfo() {
  const { id } = useParams();
  const [calls, setCalls] = useState([]);
  const [info, setInfo] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [selectedFile, setSelectedFile] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem("value");
    return saved || "1";
  });

  const [some, setSome] = useState([])
  const [open, setOpen] = useState(false);
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const [chip] = useState("")
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);

  };
  // const callStatus = () =>{
  //   if (calls.status === "Open") {
  //    const chip = <div>
  //       <Chip icon={<InfoIcon color="primary" />} label={value.value} color="primary" variant="outlined" />

  //     </div>
  //   }
  //   else if (calls.status === "Closed") {
  //    const chip = <div>
  //       <Chip icon={<CheckIcon color="success" />} label={value.value} color="success" variant="outlined" />
  //     </div>
  //   }

  //   else if (calls.status === "In Progress") {
  //    const chip =  <div>
  //       <Chip icon={<AutorenewIcon color="warning" />} label={value.value} color="warning" variant="outlined" />
  //     </div>
  //   }
  // }

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleBackDropOpen = () => {
    setOpenBackDrop(true);
  };
  const handleBackDropClose = () => {
    setOpenBackDrop(false);
  };

  async function fetchCalls() {
    const getCalls = await (await fetch(config.apiUrl + `/getCalls/${id}`, {
      method: "GET",
      credentials: "include",
    })).json()
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
    setInfo(fetchData);

    if (fetchData.status === "200") {
      window.location.reload()
    }
  };
  const onSubmittingFileLoader=(
    <Box sx={{ width: '100%' }}>
    <LinearProgress variant="determinate" value={progress} />
  </Box>
  )


  useEffect(() => {
    
    setLoading(true)
    fetchCalls()
    localStorage.setItem("value", value);

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100)
      });
    }, 500)
    return () => {
      clearInterval(timer);
    }

  }, [value])


  const columns = [
    { field: "fileName", headerName: "File Name", width: 250 },
    {
      field: "image", headerName: "File", width: 250, renderCell: (cellValues) => {
        return <a href={`data:${cellValues.row.contentType};base64,${cellValues.row.image}`} download >{cellValues.row.fileName}</a>;
      }
    },
    { field: "uploadDate", headerName: "Upload Date", width: 250 },
    {
      field: "Action", headerName: "Actions", key: "Action", width: 150, renderCell: (item) => (
        <>
          <Button
            style={{
              backgroundColor: "#e8605d",
              padding: "3px 35px"
            }}
            onClick={() => handleDelete(item.row.itemId)}
            variant="contained"
            color="primary"
            type="submit"
          >
            Delete
          </Button>
          
        </>
      )
    },
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      width: 100,
    },
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

  const refreshPage = () => {
    window.location.reload();
  }
  async function handleDelete(item) {
    try {
      const deleteFile = await (await fetch(config.apiUrl + `/deleteFile/${id}/${item}`, {
        method: "DELETE",
        credentials: "include",
      })).json()
      if (deleteFile.status === 200) {
        refreshPage()
        return console.log("done");
      }

    } catch (err) {
      console.log(err);
    }
  }

  const CancelFileUpload = () => {
    setIsFilePicked(false)
    setSelectedFile(null)
  }
  const formik = useFormik({
    initialValues: {
      userName: calls.userName,
      system: calls.system,
      assignee: "",
      team: calls.team,
      status: "Open",
      description: calls.description,
      link: window.location.origin,
    },
    validationSchema: UpdateSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await fetch(config.apiUrl + `/updateCall/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(values),
      })
      refreshPage()

    },

  });


  return (
    <>
      {isLoading ? <div>Loading</div> :
        <Box className="tabs" sx={{ width: '90%', typography: 'body1' }}>
          {openBackDrop === true ?
            <Backdrop open={openBackDrop}>
              <Card id="backdropUpdate" >
                <CardContent>
                  <CardActions>
                    <FontAwesomeIcon icon={faTimes} onClick={handleBackDropClose} />
                  </CardActions>
                  <form onSubmit={formik.handleSubmit}>
                    <Card id="Card_Call">
                      <div className="call_header">
                        <div>
                          <GetUsers label="userName" labelId="userName" id="input" name="userName" value={formik.values.userName} defaultValue={calls.userName} onChange={formik.handleChange} error={formik.touched.userName && formik.errors.userName} helpertext={formik.touched.userName && formik.errors.userName} />
                        </div>
                        <div>
                          <GetSystems labelId="system" id="input" name="system" defaultValue={calls.system} value={formik.values.system} onChange={formik.handleChange} error={formik.touched.system && formik.errors.system} helpertext={formik.touched.system && formik.errors.system} />
                        </div>
                        <div>
                          <Teams labelId="teams" id="input" name="team" defaultValue={calls.team} onChange={formik.handleChange} value={formik.values.team} error={formik.touched.team && formik.errors.team} helpertext={formik.touched.team && formik.errors.team} />
                        </div>
                        <TextField
                          disabled
                          id="input"
                          name="status"
                          label="status"
                          type="status"
                          value={formik.values.status}
                          defaultValue={calls.status}
                          onChange={formik.handleChange}
                          error={formik.touched.status && formik.errors.status}
                          helpertext={formik.touched.status && formik.errors.status}
                        />

                        <TextField
                          id="input"
                          name="description"
                          label="description"
                          type="description"
                          value={formik.values.description}
                          defaultValue={calls.description}
                          onChange={formik.handleChange}
                          error={formik.touched.description && formik.errors.description}
                          helpertext={formik.touched.description && formik.errors.description}
                        />

                      </div>
                    </Card>
                    <Button color="primary" onSubmit={formik.onSubmit} variant="contained" id="button_submit" type="submit">
                      Update Call
                    </Button>
                    
                  </form>
                </CardContent>
              </Card>
            </Backdrop>
            :
            <TabContext value={value} >
              <Box className="tabs" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList id="tabList" onChange={handleChange} >
                  <Tab label="Call Properties" value="1" />
                  <Tab label="Item Two" value="2" />
                  <Tab label="AddOns" value="3" />
                </TabList>
              </Box>
              <TabPanel id="TabPanel" value="1">
              <Button >Take Call</Button>
                <Button onClick={handleBackDropOpen}>Update Call</Button>
                <Card id="Card_Call">
                  <div className="call_header">

                    <TextField
                      disabled
                      id="call_id"
                      label="Call Id"
                      defaultValue={id}
                      variant="standard"
                    />
                    <div>
                      {calls.status === "Open" ?  <Chip icon={<InfoIcon color="primary" />} label={calls.status} color="primary" variant="outlined" /> 
                      : calls.status === "Closed" ?  <Chip icon={<CheckIcon color="success" />} label={calls.status} color="success" variant="outlined" /> 
                      : calls.status === "In Progress" ? <Chip icon={<AutorenewIcon color="warning" />} label={calls.status} color="warning" variant="outlined" />
                      : null}
                    </div>
                    <div>
                    
                  </div>
                  </div>
                  <div className="callInfo">
                    <a href={`/userInfo/${calls.userName}`}>

                      <TextField disabled
                      id="standard-disabled"
                      label="UserName"
                      defaultValue={calls.userName}
                      variant="standard" /></a>
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
                      label="Assignee"
                      defaultValue={calls.assignee}
                      variant="standard"
                    />
                     <TextField
                      disabled
                      id="standard-disabled"
                      label="Team"
                      defaultValue={calls.team}
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
                      label="Description"
                      defaultValue={calls.description}
                      variant="standard"
                    />
                  </div>
                </Card>
              </TabPanel>



              <TabPanel id="TabPanel" value="2">Item Two</TabPanel>
              <TabPanel id="TabPanel" value="3">
                <div>
                  {isFilePicked ?
                    <>
                      <div>
                        {selectedFile.name}
                      </div>
                      <>
                        <Button
                         onClick={handleSubmission}>Submit </Button>
                        
                      </>
                      <Button
                        style={{
                          backgroundColor: "#e8605d",
                          padding: "3px 35px"
                        }}
                        onClick={CancelFileUpload}
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        Remove File
                      </Button>
                      {/* <Button id="CancelFileUpload" onClick={CancelFileUpload}>Remove File</Button> */}
                    </>
                    : <><input type="File" name="File" onChange={changeHandler} /><div>Please Pick A File</div></>}
                  {!calls.picture ? null :
                    <div style={{ height: 500, width: "100%" }}>

                      <DataGrid
                        getRowId={(row) => row.itemId}
                        rows={calls.picture}
                        columns={columns}
                        pageSize={25}
                        
                        getCellActions={getCellActions}
                      />

                    </div>
                  }
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