// import React, { useEffect, useState } from 'react';
// import config from "../../config/index";
// import { DataGrid, GridToolbarExport, GridToolbarContainer, GridToolbar } from "@mui/x-data-grid";
// import "./Systems.scss";
// import Skeleton from '@mui/material/Skeleton';
// import { Link } from "react-router-dom";
// import { Box } from '@mui/material';
// import Chip from '@mui/material/Chip';
// import InfoIcon from '@mui/icons-material/Info';
// import CheckIcon from '@mui/icons-material/Check';
// import AutorenewIcon from '@mui/icons-material/Autorenew';
// import AdminPanel from '../adminPanel/adminPanel';
// import { useLocation } from 'react-router-dom';

// export default function Systems() {
//     const [systems, setSystems] = useState([])
//     const [pageSize, setPageSize] = useState(25);
//     const [error, setError] = useState("")
//     const [isMounted, setMounted] = useState(true);
//     const [isLoading, setLoading] = useState(true);
//     const location = useLocation()

//     async function fetchSystems() {
//         try {
//           const getSystems = await (await fetch(config.apiUrl + `/system`, {
//             method: "GET",
//             credentials: "include",
//           })).json()
//           setLoading(false)
//           if (!error) {
//             setSystems(getSystems)
//           }
//           setError(getSystems.message)
//         } catch (err) {
//           return err;
//         }
//       }

//       useEffect(() => {

//         if (!error) {
//           if (isMounted) {
//             fetchSystems();
    
//           }
//           return (() => {
//             setMounted(false)
//           })
//         }
//       }, [])


//       const INITIAL_GROUPING_COLUMN_MODEL = ['description']
//       const columns = [
//         {
//           field: '_id', headerName: "call id", renderCell: (cellValues) => {
//             return <Link to={`/callInfo/${cellValues.value}`}>{cellValues.value}</Link>;
//           }
//         },
//         { field: "userName", headerName: "userName", width: 150 },
//         { field: "system", headerName: "system", width: 150 },
//         { field: "assignee", headerName: "Assignee", width: 150 },
//         { field: "team", headerName: "Team", width: 100 },
//         {
//           field: "status", headerName: "Status", width: 150, renderCell: (value) => {
//             if (value.value === "Open") {
//               return <div>
//                 <Chip icon={<InfoIcon color="primary" />} label={value.value} color="primary" variant="outlined" />
    
//               </div>
//             }
//             else if (value.value === "Closed") {
//               return <div>
//                 <Chip icon={<CheckIcon color="success" />} label={value.value} color="success" variant="outlined" />
//               </div>
//             }
    
//             else if (value.value === "In Progress") {
//               return <div>
//                 <Chip icon={<AutorenewIcon color="warning" />} label={value.value} color="warning" variant="outlined" />
//               </div>
//             }
//           }
//         },
//         { field: "description", headerName: "description", width: 250 },
//         { field: "openingDate", headerName: "opening date", width: 200 },
//       ];















// }