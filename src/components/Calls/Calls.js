import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import config from "../../config/index";


import { createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

function createData(ID,username,system,description,openingDate) {
  return {ID,username,system,description,openingDate};
}


export default function Calls() {
  const [calls, setCalls] = useState([])
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  async function fetchCalls() {
    try {
      const getCalls = await fetch(config.apiUrl + `/getCalls`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
      const fetchCalls = await getCalls.json();
      setCalls(fetchCalls)
    } catch (err) {
      console.log(err);
    }
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetchCalls()
  }, [])
const mappingData = calls.map((call)=>{
  return createData(<Link to={`/callInfo/${call._id}`}>{call._id}</Link>, call.userName , call.system ,call.description,call.openingDate)
})
console.log(mappingData);




  return (
    <div className={classes.root}>
      this is calls
    
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {mappingData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id && typeof value === 'number'
                            ? column.format(value)
                            :value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={mappingData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
      {/* {calls.map((call)=>(
      <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs zeroMinWidth>
                 <Typography noWrap>userName : {call.userName}</Typography>
                 <Typography noWrap>system : {call.system}</Typography>
            </Grid>
          </Grid>
      </Paper>
      ))}
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs>
            <Typography noWrap>{message}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs>
            <Typography>{message}</Typography>
          </Grid>
        </Grid>
      </Paper> */}
    </div>
  );
}


const defaultTheme = createTheme();

const useStyles = makeStyles(
  (theme) => ({
    root: {
      marginTop: 100,
      flexGrow: 1,
      overflow: 'hidden',
      padding: theme.spacing(0, 3),
    },
    paper: {
      direction: "rtl",
      maxWidth: 400,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    textPrimary: {
      color: theme.palette.text.primary,
    },
  }),
  { defaultTheme },
);

const columns = [
  { id: 'ID', label: 'ID', minWidth: 20 },
  { id: 'username', label: 'username', minWidth: 20 },
  { id: 'system', label: 'system', minWidth: 30 },
  { id: 'description', label: 'description', minWidth: 60 },
  { id: 'openingDate', label: 'opening Date', minWidth: 20 },
  
];
