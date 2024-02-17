import React, { useState, useEffect } from "react";
import config from "../../config/index";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "./Users.scss";
import { useNavigate } from "react-router-dom";
import Chip from '@mui/material/Chip';
import GetUsers from "./getUsers";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Loading from "../Loading/Loading";



export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("")
  const [isMounted, setMounted] = useState(true);
  const [pageSize, setPageSize] = useState(25);
  const [isLoading, setLoading] = useState(true);
  const history = useNavigate();

console.log(users);

  async function getUsers() {
    const getUser = await (await fetch(config.apiUrl + `/getUser`, {
      method: "GET",
      credentials: "include",
    })).json()
    if (users) {
      setUsers(getUser)
    } else {
      setError(getUser)
      setLoading(false)
    }
  }

  useEffect(() => {
    if(!error){
      if(isMounted){
        getUsers()
      }
      return(()=>{
        setMounted(false)
      })
    }
  }, [])

  const columns = [
    {
      field: 'employeeId', headerName: "Employee ID", width: 150, renderCell: (cellValues) => {
        return <Link to={`/userInfo/${cellValues.value}`}>{cellValues.value}</Link>;
      }
    },
    { field: "userName", headerName: "userName", width: 150 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    {
      field: "email", headerName: "Email", width: 150, renderCell: (params) => (
        <a href={`mailto:${params.value}`}>{params.value}</a>
      )
    },
    {
      field: "status", headerName: "Status", width: 150, renderCell: (value) => {
        if (value.value === "Active") {
          return <div>
            <Chip label={value.value} color="success" variant="outlined" />

          </div>
        }
        else if (value.value === "Not Active") {
          return <div>
            <Chip label={value.value} color="error" variant="outlined" />
          </div>
        }


      }
    },
    { field: "openingDate", headerName: "opening date", width: 200 },
    // { field: "isAdmin", headerName: "Is Admin?", width: 100 },
  ];
  return (
    <>
      {/* {isLoading ? <><div>Loading</div><div>Loading</div><div>Loading</div><div>Loading</div><div>Loading</div><div>Loading</div><div>Loading</div><div>Loading</div><div>Loading</div><div>Loading</div></> : */}

        <div className='table'>
          {error.status === 401 ? <> <h1>Not Admin!</h1><h1>Not Admin!</h1> <h1>Not Admin!</h1> <h1>Not Admin!</h1> <h1>Not Admin!</h1> <h1>Not Admin!</h1> <h1>Not Admin!</h1> <h1>Not Admin!</h1> <h1>Not Admin!</h1> <h1>Not Admin!</h1> <h1>Not Admin!</h1> <h1>Not Admin!</h1> </> :
            <div style={{ height: '89%', width: '100%',position: "absolute" }}>


              <DataGrid 
                columns={columns}
                getRowId={(row) => row._id}
                rows={users}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[25, 50, 100]}
                pagination
                //  initialState={{
                //   rowGrouping: {
                //     model: INITIAL_GROUPING_COLUMN_MODEL,
                //   },
                // }}
                disableSelectionOnClick
              />



            </div>
          }

        </div>
       {/* }  */}
    </>
  )

}

