// import React from 'react';
import { BrowserRouter as withRouter, useHistory } from 'react-router-dom'
import Test from '../../components/createtest/test';
// import Draw from '../../components/Draw/Draw';
import Testitem from '../../components/testitem/testitem'
import React, { useEffect } from 'react';
// import { useHistory } from "react-router-dom";
import history from '../../history';
// import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import './homepage.css';
import Axios from 'axios';
import swal from 'sweetalert';
import Login from '../login_signup/login/login';
// import React from 'react';
import clsx from 'clsx';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import { Button } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';



function HomeButton() {
    let history = useHistory();
    history.push("/");
}
class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            test: false,
            teacher: false,
            testdis: false,
            questions: [],
            answers: [],
            options: [],
            display: [],
            result: false,
            userresult: false,
        }
    }

    handleDrawerOpen = () => {
        if (localStorage.getItem('teacher') !== null) {
            this.setState({
                teacher: true
            })
        }
        this.setState({
            open: !this.state.open
        })
    };
    viewresultuser = () => {
        this.setState({
            userresult: !this.state.userresult
        })
    }
    viewresult = () => {
        this.setState({
            result: !this.state.result
        })
    }
    submit = () => {
        swal('you have attend the test', 'wait for your results', "success");

        this.setState({
            testdis: false
        })
    }
    attendtest = () => {
        var user = JSON.parse(localStorage.getItem('student'))
        console.log(user);
        Axios.get(`http://localhost:5000/student/gettest?subject=${user.data.subject}`)
            .then(res => {
                console.log(res.data);
                if (res.data.success === true) {
                    this.setState({
                        testdis: true
                    })
                }
            })
    }
    createtest = (e) => {
        this.setState({
            test: !this.state.test
        })
        console.log(this.state.test);
    }
    share = () => {
        swal('test results shared with student', 'results are in student dashboard', "success");
    }
    logout = () => {
        localStorage.clear();
        this.props.history.push({ pathname: '/' });
    }
    render() {

        return (
            <div>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton color="inherit" aria-label="open drawer" onClick={e => this.handleDrawerOpen()} edge="start">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" >Testing Engine</Typography>
                    </Toolbar>
                </AppBar>
                {this.state.teacher ?
                    <Drawer variant="persistent" anchor="left" open={this.state.open}>
                        <IconButton onClick={e => this.handleDrawerOpen()}>
                            <ChevronLeftIcon />
                        </IconButton>
                        <Divider />
                        <List>
                            <ListItem button onClick={e => this.createtest(e)} key='Create Test'>
                                <ListItemText primary='Create Test' />
                            </ListItem>
                            <ListItem button onClick={e => this.viewresult()} key='View Test Result'>
                                <ListItemText primary='View Test Result' />
                            </ListItem>
                            <ListItem button onClick={e => this.logout()} key='Logout'>
                                <ListItemText primary='Logout' />
                            </ListItem>
                        </List>
                    </Drawer> : <Drawer variant="persistent" anchor="left" open={this.state.open}>
                        <IconButton onClick={e => this.handleDrawerOpen()}>
                            <ChevronLeftIcon />
                        </IconButton>
                        <Divider />
                        <List>
                            <ListItem button onClick={e => this.attendtest(e)} key='Attend Test'>
                                <ListItemText primary='Attend Test' />
                            </ListItem>
                            <ListItem button onClick={e => this.viewresultuser()} key='View Test Result'>
                                <ListItemText primary='View Test Result' />
                            </ListItem>
                            <ListItem button onClick={e => this.logout()} key='Logout'>
                                <ListItemText primary='Logout' />
                            </ListItem>
                        </List>
                    </Drawer>}
                <div>
                    {this.state.testdis ?
                        <div className='testset'>
                            <div>
                                <textarea style={{ height: "40px", width: "400px", border: "none", overflow: "auto" }} name="questiondesc" selectTextOnFocus={false} editable={false} cols="50" rows="5"  >h2o stands for ?</textarea>
                                <br />
                                <label>water</label>
                                <input type="radio" value="water" />
                                <label>sand</label>
                                <input type="radio" value="sand" />
                            </div>
                            <div>
                                <textarea style={{ height: "40px", width: "400px", border: "none", overflow: "auto" }} name="questiondesc" selectTextOnFocus={false} editable={false} cols="50" rows="5"  >e=mc2 is given by?</textarea>
                                <br />
                                <label>einstein</label>
                                <input type="radio" value="einstein" />
                                <label>tesla</label>
                                <input type="radio" value="tesla" />
                            </div>
                            <div>
                                <textarea style={{ height: "40px", width: "400px", border: "none", overflow: "auto" }} name="questiondesc" selectTextOnFocus={false} editable={false} cols="50" rows="5"  >Smallest living organism?</textarea>
                                <br />
                                <label>bacteria</label>
                                <input type="radio" value="bacteria" />
                                <label>fungus</label>
                                <input type="radio" value="fungus" />
                            </div>
                            <button onClick={e => this.submit()} value="submit">Submit Test</button>
                        </div> : <></>}
                </div>
                <div>
                    {this.state.test ? <div style={{ marginTop: "100px", marginLeft: "100px", marginRight: "100px", backgroundColor: "white" }} >
                        <Test></Test>
                    </div> : <></>}
                </div>
                <div >{this.state.result ? <table className="testresult">
                    <tr>
                        <th>
                            student ID
                        </th>
                        <th>
                            Marks
                        </th>
                        <th>
                            Share result to Student
                        </th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>3</td>
                        <td><button onClick={e => this.share()}>Share</button></td>
                    </tr>
                </table> : <></>

                }</div>
                <div>{this.state.userresult ? <div className="testresult">your marks is 3</div> : <></>}
                </div>
            </div>
        );
    }
}

export default (Homepage);