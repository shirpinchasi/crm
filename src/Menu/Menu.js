import React, { useState, useEffect } from "react";
import "./Menu.scss"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
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
import db from "../firebase";
import firebase from "../firebase";
import { Link } from "@material-ui/core";
const fire = firebase.firestore();






export default function ResponsiveDrawer(props) {
    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const { window } = props;
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [users, setUsers] = useState([]);
    const [options, setOptions] = useState("");
    const [numId, setNumId] = useState(1)
    

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const increase = () => {
        setNumId(numId +1);
      };

    const handleClose = () => {
        setOpen(false);
        setOptions("")
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const handleDrawerToggle = (props) => {
        setMobileOpen(!mobileOpen);
    };
    const handleUserChange = (e) => {
        setOptions(e.target.value)
        
    };
    const sendData = (e)=>{
        fire
        .collection("Menu").add({
            id :numId,
            name : options,
            // id : firestore.FieldValue.increment(1)
        },{merge :true})
        .then(()=>{
            setOptions("")
            setNumId(numId +1)
            console.log("success");
        })
        .catch((error)=>{
            console.error("Error: ", error);
        })
    }


    useEffect(()=>{
        db
        .firestore()
        .collection("Users")
        .onSnapshot((snapshot)=>{
            const newUsers = snapshot.docs.map((doc)=>({
                id : doc.id,
                ...doc.data()
            }))
            setUsers(newUsers)
            
            
        })
        setNumId(numId)
    },[options,numId])
console.log(numId);
    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItemText className="text">
                <Link  color="inherit" href="/Bakashot">
                    בקשות
                </Link>
                <br/>
                <Link color="inherit"  href="/Calls">
                    קריאות
                </Link>
                <br/>
                <Link color="inherit"  href="/DrishotShinui">
                    דרישות שינוי
                </Link>
                <br/>
                <Link color="inherit"  href="/Activities">
                    פעילויות
                </Link>
                <br/>
                </ListItemText>
                
                {/* {['בקשות', 'קריאות', 'דרישות שינוי', 'פעילויות'].map((text, index) => (
                    
                    <ListItem button key={index}>
                        {console.log(index)}
                        <ListItemText primary={text} />
                    </ListItem>
                ))} */}
            </List>
            <Divider />
            <List>
                {['פרטי תצורה', 'קטלוג מערכות', 'משתמשים','דרישות פרט'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar id="1" >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography id="crmTitle" variant="h6" noWrap>
                            CRM
                        </Typography>
                        <Typography >
                            <Button id="plusIcon" variant="outlined" color="primary" onClick={handleToggle}>
                                קריאה חדשה
                            </Button>
                            <Backdrop className={classes.backdrop} open={open}>
                                {/* <CircularProgress color="inherit" /> */}
                                <Card id="backdrop" className={classes.root}>
                                    <CardContent>
                                        <CardActions>
                                            <FontAwesomeIcon icon={faTimes} onClick={handleClose} />
                                        </CardActions>
                                        <FormControl required className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-required-label">שם משתמש</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-required-label"
                                                id="demo-simple-select-required"
                                                value={options}
                                                onChange={handleUserChange}
                                                className={classes.selectEmpty}
                                            >
                                                {/* <MenuItem value="">
                                                    <em>NONE</em>
                                                </MenuItem> */}
                                                
                                                {Object.entries(users || console.log("none")).map(([key,value],i)=>{
                                                    return(
                                                        <MenuItem required={true} key={key} value={value.Username}>{value.Username} </MenuItem>
                                                        
                                                    )
                                                           
                                                        
                                                
                                                    // <MenuItem value={value.id}>{value.id}</MenuItem>
                                                    // console.log("this is value", value)
                                                    // console.log("this is i",i)
                                                })}
                                                {/* {users.map((user)=>(
                                                        <MenuItem value={user.Username}>{user.Username}</MenuItem>
                                                ))} */}
                                                
                                                
                                            </Select>
                                            <FormHelperText>Required</FormHelperText>
                                        </FormControl>
                                        {/* <FormControl required className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-required-label">שם פרטי</InputLabel>
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
                                        <br/>
                                        
                                        <Button disabled={!options} onClickCapture={handleClose} onClick={sendData}>save</Button>
                                    </CardContent>

                                </Card>

                            </Backdrop>

                        </Typography>
                    </Toolbar>
                    
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    <Hidden smUp implementation="css">
                        <Drawer id="1"
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'right'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer id="2"
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            anchor="right"
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Typography paragraph>
                        
                    {/* {Object.entries(users).map(([key,value],i)=>{
                                                    <div>
                                                        
                                                    </div>
                                                    // <MenuItem value={value.id}>{value.id}</MenuItem>
                                                    // console.log("this is value", value)
                                                    // console.log("this is i",i)
                                                })} */}
                    </Typography>
                    <Typography paragraph>
                        
                    </Typography>
                </main>
            </div>
        </div>
    );
}


ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,

}



const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        color: "black",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,

    },
    root: {
        display: 'flex',
    },
    drawer: {
        direction: "rtl",
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            // flexShrink: 0,

        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginRight: drawerWidth,
        },
    },
    menuButton: {
        position: "absolute",
        right: 0,
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    
    drawerPaper: {
        position: "absolute",
        right: 0,
        width: drawerWidth,
    },
    content: {

        flexGrow: 1,
        padding: theme.spacing(3),
    },
    // root: {
    //     '& > *': {
    //         margin: theme.spacing(1),
    //     },
    // },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    root: {
        // marginRight: 200,
        // minWidth: 900,
        // minHeight: 600,
        // direction : "rtl"
        
        
        
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

