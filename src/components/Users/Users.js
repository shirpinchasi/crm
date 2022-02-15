import React, { useState, useEffect,useContext } from "react";
import config from "../../config/index";
import {DataGrid,getRowId} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "./Users.scss"


export default function Users(){
    const [users, setUsers] = useState([]);
    async function getUsers() {
        const getUser = await (await fetch(config.apiUrl +  `/getUser`, {
            method: "GET",
            credentials:"include",
        })).json()
        setUsers(getUser)
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
        { field: "openingDate", headerName: "opening date", width: 200 },
      ];
    return(
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
    )

}

