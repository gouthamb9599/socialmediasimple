import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PostAddIcon from '@material-ui/icons/PostAdd';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import BurstModeIcon from '@material-ui/icons/BurstMode';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupIcon from '@material-ui/icons/Group';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Bio from '../components/bio';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function MiniDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [openbio, setOpenbio] = React.useState(false);
    const [existb, setExistb] = React.useState('');



    const addbio = () => {
        setOpenbio(!openbio);
    }

    const handleDrawerOpen = () => {
        const user = JSON.parse(sessionStorage.getItem('userData'));
        setUsername(user.Name);
        setExistb(user.personal_info)
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Facebook
          </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <div><div><AccountCircleIcon />{username}</div>
                        <div>About Me:</div>
                        <div>{existb}</div></div>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button key='Post Feeds'>
                        <ListItemIcon><DynamicFeedIcon /> </ListItemIcon>
                        <ListItemText primary='Post Feeds' />
                    </ListItem>
                    <ListItem button key='Your Posts'>
                        <ListItemIcon> <BurstModeIcon /></ListItemIcon>
                        <ListItemText primary='Your Posts' />
                    </ListItem>
                    <ListItem button key='New Post'>
                        <ListItemIcon><PostAddIcon /> </ListItemIcon>
                        <ListItemText primary='New Post' />
                    </ListItem>
                </List>
                <Divider />
                <List>

                    <ListItem button key='Find Friends'>
                        <ListItemIcon><PersonAddIcon /> </ListItemIcon>
                        <ListItemText primary='Find Friends' />
                    </ListItem>
                    <ListItem button key='Followers'>
                        <ListItemIcon><GroupIcon /> </ListItemIcon>
                        <ListItemText primary='Followers' />
                    </ListItem>
                    <ListItem button key='Following'>
                        <ListItemIcon><PeopleOutlineIcon /> </ListItemIcon>
                        <ListItemText primary='Following' />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button onClick={addbio} key='About You'>
                        <ListItemIcon><InfoIcon /> </ListItemIcon>
                        <ListItemText primary='About You' />
                    </ListItem>
                    <ListItem button onClick={props.logout} key='Logout'>
                        <ListItemIcon><ExitToAppIcon /> </ListItemIcon>
                        <ListItemText primary='Logout' />
                    </ListItem>
                </List>
            </Drawer>
            <div>
                {openbio ? <Bio open={openbio} /> : <></>

                }
            </div>
        </div>
    );
}
