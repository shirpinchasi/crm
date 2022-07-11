import React, { useEffect, useState } from 'react';
import config from "../../config/index";
import { DataGrid, GridToolbarExport, GridToolbarContainer } from "@mui/x-data-grid";
import "./Calls.scss";
import Skeleton from '@mui/material/Skeleton';
import { Link } from "react-router-dom";
import { Box } from '@mui/material';
import Chip from '@mui/material/Chip';
import InfoIcon from '@mui/icons-material/Info';
import CheckIcon from '@mui/icons-material/Check';
import AutorenewIcon from '@mui/icons-material/Autorenew';


export default function Calls() {
  const [calls, setCalls] = useState([])
  const [pageSize, setPageSize] = useState(25);
  const [error, setError] = useState("")
  const [isMounted, setMounted] = useState(true);
  const [isLoading, setLoading] = useState(true);



  async function fetchCalls() {
    try {
      const getCalls = await(await fetch(config.apiUrl + `/getCalls`, {
        method: "GET",
        credentials: "include",
      })).json()
      setLoading(false)
      if (!error) {
        setCalls(getCalls)
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

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  const INITIAL_GROUPING_COLUMN_MODEL = ['description']
  const columns = [
    {
      field: '_id', headerName: "call id", renderCell: (cellValues) => {
        return <Link to={`/callInfo/${cellValues.value}`}>{cellValues.value}</Link>;
      }
    },
    { field: "userName", headerName: "userName", width: 150 },
    { field: "system", headerName: "system", width: 150 },
    { field: "goremMetapel", headerName: "Assignee", width: 150 },
    { field: "team", headerName: "Team", width: 100 },
    {
      field: "status", headerName: "Status", width: 150, renderCell: (value) => {
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
    { field: "description", headerName: "description", width: 250 },
    { field: "openingDate", headerName: "opening date", width: 200 },
  ];


  return (
    <>
      {isLoading ?
        <>
          <Box sx={{ width: 300, height: 400 }}>
            <Skeleton animation="wave" />
            
          </Box>
        </>
         : 
        <div className='table'>
          <Box style={{ height: 540, width: '100%' }}>
            <DataGrid
              columns={columns}
              getRowId={(row) => row._id}
              rows={calls}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[25, 50, 100]}
              pagination
              initialState={{
                rowGrouping: {
                  model: INITIAL_GROUPING_COLUMN_MODEL,
                },
              }}

              experimentalFeatures={{
                rowGrouping: true,
              }}
              components={{
                Toolbar: CustomToolbar,
              }}
              disableSelectionOnClick
            />

          </Box>
        </div>
       } 
    </>
  );
}
