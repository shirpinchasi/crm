import React, { useState, useEffect } from "react";
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
import { Link } from "@material-ui/core";
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MuiAppBar from '@mui/material/AppBar';
import { useNavigate } from "react-router-dom";
import config from "../config/index";
import NewCall from "../components/Calls/newCall";



export default function Menu(props) {
    const [getSystem, setAllSystems] = useState([]);
    const theme = useTheme();
    const [userName, setUserName] = useState([]);
    const [system, setSystem] = useState([]);
    const [goremMetapel, setGoremMetapel] = useState([]);
    const [team, setTeam] = useState([]);
    const [status, setStatus] = useState([]);
    const [description, setDescription] = useState([])
    const [open, setOpen] = useState(false);
    const [openBackDrop, setOpenBackDrop] = useState(false);
    const history = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleBackDropOpen = () => {
        setOpenBackDrop(true);
    };
    const handleBackDropClose = () => {
        setOpenBackDrop(false);
        setUserName("")
        setSystem("")
        setGoremMetapel("")
        setTeam("")
        setStatus("")
        setDescription("")
    };
console.log(props);
    // async function getSystems() {
    //     const getSystem = await (await fetch(config.apiUrl + `/system`, {
    //         method: "GET",
    //         credentials: "include",
    //     })).json()
    //     setAllSystems(getSystem)
    // }
    async function logOut() {
        const logout = await fetch(config.apiUrl + "/logOut", {
            method: "GET",
            credentials: "include",
        })
        const data = await logout.json()
        if (logout.status === 200) {
            window.location = data.redirectUrl
        }
    }
    useEffect(() => {
       
    }, [userName, system, goremMetapel, team, status, description])

    return (
        <div>


            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar id="Menu" >
                        <IconButton
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <>
                        {props.types === "admin" ? 
                        <>
                         <Typography variant="h6" noWrap component="div">
                         <Link color="inherit" href="/">
                                CRM
                            </Link>
                     </Typography>
                     <Typography id="Hello" variant="h6" noWrap component="div">
                          Hello {props.props.userName} 
                     </Typography>
                     {/* {window.location.pathname === "/adminPanel" ? <Button>Hello</Button> : null} */}
                     
                     <Button id="LogOff" variant="outlined" color="primary" onClick={logOut}>
                         LogOff
                     </Button>
                     <Button id="plusIcon" variant="outlined" color="primary" onClick={handleBackDropOpen}>
                         New Call
                     </Button>
                     </>
                        :
                        <>
                        <Typography variant="h6" noWrap component="div">
                        <Link color="inherit" href="/">
                                CRM
                            </Link>
                     </Typography>
                     <Typography id="Hello" variant="h6" noWrap component="div">
                          Hello {props.props.userName} 
                     </Typography>
                     {/* {window.location.pathname === "/adminPanel" ? <Button>Hello</Button> : null} */}
                     
                     <Button id="LogOff" variant="outlined" color="primary" onClick={logOut}>
                         LogOff
                     </Button>
                     </>
                        
                        }
                        </>
                       
                        

                        <Backdrop open={openBackDrop}>
                            <Card id="backdrop" >
                                <CardContent>
                                    <CardActions>
                                        <FontAwesomeIcon icon={faTimes} onClick={handleBackDropClose} />
                                    </CardActions>
                                    <NewCall props={openBackDrop} onClick={handleBackDropClose} />
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
                    {props.types === "admin" ? 
                    <>
                    <DrawerHeader >
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        <ListItemText className="text">
                        <Link color="inherit" href="/adminPanel">
                                Admin Panel
                            </Link>
                            <Divider />
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
                    </>
                    :
                    <>
                    <DrawerHeader >
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                    <Link color="inherit" href="/">
                                Home
                            </Link>
                    </List>
                    
                    </>
                    }
                </Drawer>
                
                


            </Box>
        </div>
    );
}


Menu.propTypes = {
    window: PropTypes.func,

}



const drawerWidth = 240;


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
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


