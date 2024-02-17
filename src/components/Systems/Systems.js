import React, { useEffect, useState } from 'react';
import config from "../../config/index";
import { DataGrid, GridToolbarExport, GridToolbarContainer, GridToolbar } from "@mui/x-data-grid";
import "./System.scss";
import Skeleton from '@mui/material/Skeleton';
import { Link } from "react-router-dom";
import { Box } from '@mui/material';
import Chip from '@mui/material/Chip';
import InfoIcon from '@mui/icons-material/Info';
import CheckIcon from '@mui/icons-material/Check';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AdminPanel from '../adminPanel/adminPanel';
import { useLocation } from 'react-router-dom';

export default function Systems() {
    const [systems, setSystems] = useState([])
    const [pageSize, setPageSize] = useState(25);
    const [error, setError] = useState("")
    const [isMounted, setMounted] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const location = useLocation()

    async function fetchSystems() {
        try {
          const getSystems = await (await fetch(config.apiUrl + `/system`, {
            method: "GET",
            credentials: "include",
          })).json()
          setLoading(false)
          if (!error) {
            setSystems(getSystems)
          }
          setError(getSystems.message)
        } catch (err) {
          return err;
        }
      }
      

      useEffect(() => {

        if (!error) {
          if (isMounted) {
            fetchSystems();
    
          }
          return (() => {
            setMounted(false)
          })
        }
      }, [])


      const columns = [
        {
          field: 'systemId', headerName: "System Id", renderCell: (cellValues) => {
            return <Link to={`/systemInfo/${cellValues.value}`}>{cellValues.value}</Link>;
          }
        },
        { field: "systemManager", headerName: "System Manager", width: 150 },
        { field: "systemName", headerName: "System Name", width: 150 },
        // { field: "assignee", headerName: "Assignee", width: 150 },
        // { field: "team", headerName: "Team", width: 100 },
        // {
        //   field: "status", headerName: "Status", width: 150, renderCell: (value) => {
        //     if (value.value === "Open") {
        //       return <div>
        //         <Chip icon={<InfoIcon color="primary" />} label={value.value} color="primary" variant="outlined" />
    
        //       </div>
        //     }
        //     else if (value.value === "Closed") {
        //       return <div>
        //         <Chip icon={<CheckIcon color="success" />} label={value.value} color="success" variant="outlined" />
        //       </div>
        //     }
    
        //     else if (value.value === "In Progress") {
        //       return <div>
        //         <Chip icon={<AutorenewIcon color="warning" />} label={value.value} color="warning" variant="outlined" />
        //       </div>
        //     }
        //   }
        // },
        // { field: "description", headerName: "description", width: 250 },
        // { field: "openingDate", headerName: "opening date", width: 200 },
      ];



      return(
        <div className='table'>
        <Box style={{ height: '89%', width: '100%',position: "absolute" }}>
            
            <DataGrid
                  columns={columns}
                  getRowId={(row) => row._id}
                  rows={systems}
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[25, 50, 100]}
                  pagination
                  experimentalFeatures={{
                    rowGrouping: true,
                  }}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                  //  initialState={{
                  //   rowGrouping: {
                  //     model: INITIAL_GROUPING_COLUMN_MODEL,
                  //   },
                  // }}
                  disableSelectionOnClick
                />
        
        </Box>
        </div>
      )











}