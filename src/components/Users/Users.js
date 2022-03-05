import React, { useState, useEffect} from "react";
import config from "../../config/index";
import {DataGrid} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "./Users.scss"
import Chip from '@mui/material/Chip';
import GetUsers from "./getUsers";

export default function Users(){
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);



    async function getUsers() {
        const getUser = await (await fetch(config.apiUrl +  `/getUser`, {
            method: "GET",
            credentials:"include",
        })).json()
        setUsers(getUser)
        setLoading(false)
    }

    useEffect(()=>{
        getUsers()
    },[])
    const columns = [
        { field: 'employeeId',headerName: "Employee ID",width:150, renderCell: (cellValues) => {
            return <Link to={`/userInfo/${cellValues.value}`}>{cellValues.value}</Link>;
          }},
        { field: "userName", headerName: "userName", width: 150 },
        { field: "firstName", headerName: "First Name", width: 150 },
        { field: "lastName", headerName: "Last Name", width: 150 },
        { field: "email", headerName: "Email", width: 150,renderCell: (params) => (
            <a href={`mailto:${params.value}`}>{params.value}</a>
          )},
        { field: "status", headerName: "Status", width: 150,renderCell :(value) =>{
          if(value.value === "Active"){
            return <div>
              <Chip label={value.value} color="success" variant="outlined" />
              
            </div>
          }
          else if(value.value === "Not Active"){
            return <div>
              <Chip  label={value.value} color="error" variant="outlined" />
            </div>
          }
          
          
        } },
        { field: "openingDate", headerName: "opening date", width: 200 },
      ];
    return(
      <>
       {isLoading ? "loadinggggggg" : 
           <div className='table'>
             

      <div style={{ height: 500, width: '100%' }}>
        
          
            <DataGrid
            columns={columns}
            getRowId={(row)=> row._id}
           rows={{id:users._id}, users}
           disableSelectionOnClick 
          />
          
       
      
  </div>
      
    </div>
}
    </>
    )

}

