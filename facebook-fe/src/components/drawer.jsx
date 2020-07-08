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
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Bio from '../components/bio';
import Newpost from '../components/newpost';
import Postlist from '../components/postlist';
import Userlist from '../components/userlist';
import Post from '../components/post';
import Axios from 'axios';
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
    const [openbio, setOpenbio] = React.useState(false);
    const [newpost, setNewpost] = React.useState(false);
    const [openpost, setOpenpost] = React.useState(false);
    const [listusers, setListusers] = React.useState(false);
    const [listfollowing, setListfollowing] = React.useState(false);
    const [listfollowers, setListfollowers] = React.useState(false);
    const [opennews, setOpennews] = React.useState(false);
    const [newsdata, setNewsdata] = React.useState([]);
    const [followinglist, setFollowinglist] = React.useState([]);
    const [followerlist, setFollowerlist] = React.useState([]);
    const [username, setUsername] = React.useState('');
    const [existb, setExistb] = React.useState('');

    const openfollowing = () => {
        const user = JSON.parse(sessionStorage.getItem('userData'));
        Axios.get(`http://localhost:5000/following?id=${user.id}`)
            .then(res => {
                // console.log(res.data)
                if (res.data.success === true) {
                    setFollowinglist(res.data.data);
                }
            })
        setListfollowing(!listfollowing);
    }
    const listnewsfeed = () => {
        const user = JSON.parse(sessionStorage.getItem('userData'));
        Axios.get(`http://localhost:5000/getfeed?id=${user.id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.success === true) {

                    setNewsdata(res.data.data);
                }
            })
        setOpennews(!opennews);


    }
    const openfollowers = () => {
        const user = JSON.parse(sessionStorage.getItem('userData'));
        Axios.get(`http://localhost:5000/followers?id=${user.id}`)
            .then(res => {
                // console.log(res.data)
                if (res.data.success === true) {
                    setFollowerlist(res.data.data);
                }
            })
        setListfollowers(!listfollowers);
    }

    const listpost = () => {
        setOpenpost(!openpost);
    }
    const addpost = () => {
        setNewpost(!newpost);
    }
    const addbio = () => {
        setOpenbio(!openbio);
    }
    const handleuserlist = () => {
        setListusers(!listusers);
    }
    const handleDrawerOpen = () => {
        const user = JSON.parse(sessionStorage.getItem('userData'));
        console.log(user);
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
                    <ListItem button onClick={listnewsfeed} key='Post Feeds'>
                        <ListItemIcon><DynamicFeedIcon /> </ListItemIcon>
                        <ListItemText primary='Post Feeds' />
                    </ListItem>
                    <ListItem button onClick={listpost} key='Your Posts'>
                        <ListItemIcon> <BurstModeIcon /></ListItemIcon>
                        <ListItemText primary='Your Posts' />
                    </ListItem>
                    <ListItem button onClick={addpost} key='New Post'>
                        <ListItemIcon><PostAddIcon /> </ListItemIcon>
                        <ListItemText primary='New Post' />
                    </ListItem>
                </List>
                <Divider />
                <List>

                    <ListItem button onClick={handleuserlist} key='Find Friends'>
                        <ListItemIcon><PersonAddIcon /> </ListItemIcon>
                        <ListItemText primary='Find Friends' />
                    </ListItem>
                    <ListItem button onClick={openfollowers} key='Followers'>
                        <ListItemIcon><GroupIcon /> </ListItemIcon>
                        <ListItemText primary='Followers' />
                    </ListItem>
                    <ListItem button onClick={openfollowing} key='Following'>
                        <ListItemIcon><GroupIcon /> </ListItemIcon>
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
                {openbio ? <Bio open={openbio} /> : <></>}
            </div>
            <div>
                {newpost ? <Newpost open={newpost} /> : <></>}
            </div>
            <div>
                {openpost ? <Postlist /> : <></>}
            </div>
            <div>
                {listusers ? <Userlist /> : <></>}
            </div>
            <div>
                {opennews ? <div style={{ marginTop: '100px', marginLeft: '250px' }}>
                    <div style={{ paddingBottom: '15px', fontSize: '20px' }}>News Feed</div>
                    <div>{newsdata.map(data => (<Post content={data.content} description={data.description} reaction={data.reaction} comment={data.comment_count} />))}</div>
                </div> : <></>

                }
            </div>
            <div>
                {listfollowing ? <div style={{ marginTop: '100px', marginLeft: '250px' }}>
                    <div style={{ paddingBottom: '15px', fontSize: '20px' }}>Following list</div>
                    <table >
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                        {followinglist.map(data => (<tr>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                        </tr>))}

                    </table></div> : <></>

                }
            </div>
            <div>
                {listfollowers ? <div style={{ marginTop: '100px', marginLeft: '250px' }}>
                    <div style={{ paddingBottom: '15px', fontSize: '20px' }}>Followers list</div>
                    <table >
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                        {followerlist.map(data => (<tr>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                        </tr>))}

                    </table></div> : <></>}
            </div>

        </div>
    );
}
