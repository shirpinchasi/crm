import React, { useEffect, useState } from 'react';
import config from "../../config/index";
import {DataGrid,getRowId,GridToolbarExport,GridToolbarContainer } from "@mui/x-data-grid";
import "./Calls.scss"
import { Link } from "react-router-dom";

export default function Calls() {
  const [calls, setCalls] = useState([])


  async function fetchCalls() {
    try {
      const getCalls = await fetch(config.apiUrl + `/getCalls`, {
        method: "GET",
        credentials:"include",
      })
      const fetchCalls = await getCalls.json();
      setCalls(fetchCalls)
    } catch (err) {
      console.log(err);
    }
  }
  console.log(calls);

  useEffect(() => {
    fetchCalls()
  }, [])

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const columns = [
  { field: '_id',headerName: "call id",renderCell: (cellValues) => {
    return <Link to={`/callInfo/${cellValues.value}`}>{cellValues.value}</Link>;
  } },
  { field: "userName", headerName: "userName", width: 150 },
  { field: "system", headerName: "system", width: 150 },
  { field: "description", headerName: "description", width: 460 },
  { field: "openingDate", headerName: "opening date", width: 200 },
];


  return (
    <div className='table'>
      <div style={{ height: 500, width: '100%' }}>
        
          
            <DataGrid
            columns={columns}
            getRowId={(row)=> row._id}
           rows={{id:calls._id},calls}
           components={{
            Toolbar: CustomToolbar,
          }}
          disableSelectionOnClick
          />
          
       
      
  </div>
      
    </div>
  );
}
