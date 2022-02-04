import React, { useState, useEffect,useContext } from "react";
import "./Menu.scss"
import { styled, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Backdrop from '@material-ui/core/Backdrop';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Link } from "@material-ui/core";
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MuiAppBar from '@mui/material/AppBar';
import { BrowserRouter, Route, useLocation, useHistory, Redirect, withRouter,Switch } from "react-router-dom";

export default function Menu(props) {
    const [users, setUsers] = useState([]);
    const [getSystem, setAllSystems] = useState([]);
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [openBackDrop, setOpenBackDrop] = useState(false);
    const [value, setValue] = useState("");
    const [system, setSystem] = useState("");
    const history = useHistory();

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleBackDropOpen = () => {
        setOpenBackDrop(true);
    };
console.log(props);
    const handleBackDropClose = () => {
        setOpenBackDrop(false);
        setValue("")
        setSystem("")
    };
    const handleUserChange = (e) => {
        setValue(e.target.value)
    };
    const handleSystemChange = (e) => {
        setSystem(e.target.value)
    };

    async function getUsers() {
        const getUser = await (await fetch("/getUser", {
            method: "GET"
        })).json()
        setUsers(getUser)
    }
    async function getSystems() {
        const getSystem = await (await fetch("/system", {
            method: "GET"
        })).json()
        setAllSystems(getSystem)
    }
    function logOut(){
        const logout =  fetch("/logOut", {
            method: "GET",
            credentials:"include"
        })
            history.push("/Login")
            window.location.reload()
            console.log("logged Out Successfully")
        
        
    }
   async function getAdmin(){
        const res = await fetch("/adminPanel", {
            method: "GET",
            credentials:"include",
        });
        if (res.status === 403) {
            alert("You Need Admin Premissions")
                history.push("/")
        }
        else if(res.status === 200){
            history.push("/adminPanel")
        }
        
    }

        
    const handleSubmit = async (values) => {
            const res = await fetch("/addCall", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    userName : value,
                    system : system,
                }),
            })
    }
    useEffect(() => {
        getUsers();
        getSystems();
        return()=>{
            setUsers([]);
            setAllSystems([])
        }    
    }, [])

    return (
        <div>

            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar >
                        <IconButton
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography  variant="h6" noWrap component="div">
                            CRM      
                        </Typography>
                          <Button onClick={getAdmin}>
                            Admin
                        </Button>
                        
                        

                        <Typography className="Hello" variant="h6" noWrap component="div">
                            Hello {props.props.userName}
                        </Typography>
                        <Button id="LogOff" variant="outlined" color="primary" onClick={logOut}>
                            LogOff
                        </Button>
                        <Button id="plusIcon" variant="outlined" color="primary" onClick={handleBackDropOpen}>
                            New Call
                        </Button>
                        <Backdrop open={openBackDrop}>
                            {/* <CircularProgress color="inherit" /> */}
                            <Card id="backdrop" >
                                <CardContent>
                                    <CardActions>
                                        <FontAwesomeIcon icon={faTimes} onClick={handleBackDropClose} />
                                    </CardActions>
                                    <Box className="box_form">
                                    <FormControl required className="form" >
                                        <InputLabel id="demo-simple-select-required-label">UserName</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-required-label"
                                            id="demo-simple-select-required"
                                            value={value}
                                            onChange={handleUserChange}
                                            required
                                            defaultValue=""
                                        >
                                            <MenuItem value="">
                                                <em>NONE</em>
                                            </MenuItem>
                                            {users.map((user) => (
                                                <MenuItem key={user._id} value={user.userName}>{user.userName} </MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText>Required</FormHelperText>
                                    </FormControl>
                                    <FormControl required className="form" >
                                        <InputLabel id="demo-simple-select-required-label">System</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-required-label"
                                            id="demo-simple-select-required"
                                            value={system}
                                            onChange={handleSystemChange}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {getSystem.map((system) => (
                                                <MenuItem key={system._id} value={system.systemName}>{system.systemName} </MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText>Required</FormHelperText>
                                    </FormControl>
                                    </Box>
                                    {/* <FormControl required className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-required-label">קטגוריה</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-required-label"
                                                id="demo-simple-select-required"
                                                value={age}
                                                onChange={handleChange}
                                                className={classes.selectEmpty}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                            <FormHelperText>Required</FormHelperText>
                                        </FormControl> */}
                                    {/* <FormControl required className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-required-label">מיקום</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-required-label"
                                                id="demo-simple-select-required"
                                                value={age}
                                                onChange={handleChange}
                                                className={classes.selectEmpty}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                            <FormHelperText>Required</FormHelperText>
                                        </FormControl> */}
                                    <br />

        
                                    <Button  onClick={() => { handleSubmit(); handleBackDropClose(); }}>save</Button>
                                </CardContent>
                            </Card>
                        </Backdrop>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader >
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        <ListItemText className="text">
                            <Link color="inherit" href="/Requests">
                                Requests
                            </Link>
                            <Divider />
                            <Link color="inherit" href="/Calls">
                                Calls
                            </Link>
                            <Divider />
                            <Link color="inherit" href="/Catalog">
                                Systems
                            </Link>
                            <Divider />
                            <Link color="inherit" href="/Users">
                                Users
                            </Link>
                        </ListItemText>
                    </List>
                </Drawer>
                {/* <Main open={open}>
                    <DrawerHeader />
                    <Typography paragraph>

                    </Typography>
                    <Typography paragraph>

                    </Typography>
                </Main> */}
            </Box>
        </div>
    );
}


Menu.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,

}



const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    width: drawerWidth,
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


