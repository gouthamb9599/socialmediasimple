import React from 'react';
import './logindiv.css';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import axios from 'axios'
import history from '../../history';
import swal from 'sweetalert';
class LoginDiv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }

    check = (e) => {
        // console.log(this.state.email, this.state.password)
        if (this.state.email !== "admin") {
            console.log(this.props.role, this.props)
            if (this.props.role == "teacher") {
                console.log('hello')
                this.ValidateEmail(this.state.email)
                axios.post('http://localhost:5000/teacher/login', { email: this.state.email, password: this.state.password })
                    .then(res => {
                        console.log(res);
                        // const users = res.data;
                        if (res.data.success === true) {
                            console.log('details verified')
                            console.log(res.data)
                            localStorage.setItem('teacher', JSON.stringify({ token: res.data.token, data: res.data.data }));
                            this.props.history.push({ pathname: '/home' });

                        }
                        else {
                            swal("invalid credentials", "retry again", "warning");
                        }
                    })
            }

            else if (this.props.role == "student") {
                console.log('hello')
                this.ValidateEmail(this.state.email)
                axios.post('http://localhost:5000/student/login', { email: this.state.email, password: this.state.password })
                    .then(res => {
                        console.log(res);
                        // const users = res.data;
                        if (res.data.success === true) {
                            console.log('details verified')
                            const studentdata = res.data.data
                            console.log(studentdata);
                            if (studentdata.access === true) {
                                localStorage.setItem('student', JSON.stringify({ token: res.data.token, data: res.data.data }));
                                this.props.history.push({ pathname: '/home' });

                            }
                            else {
                                swal("you have registered successfully", "Wait until your access is approved", "info")
                            }
                            // this.props.history.push({ pathname: '/' });
                        }
                        else {
                            swal("invalid credentials", "retry again", "warning");
                        }
                    })
            }
        }
        else {
            if (this.state.email === "admin" && this.state.password === "admin") {
                console.log("admin")
                localStorage.setItem('admin', "admin");
                this.props.history.push({ pathname: '/Admin' });

            }
            else {
                swal("invalid credentials", "retry again", "warning");
            }

        }


    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        swal("warning", "You have entered an invalid email address!", "warning")
        return (false)
    }

    render() {
        return (
            <div className="signpage">
                <div className="container">
                    {/* {(this.props.value === 0) ? <h2 className="heading">Student LOGIN</h2> : <h2 className="heading">Teacher LOGIN</h2>} */}
                    <div id="login">
                        {/* <div className="col-25">
                        <label htmlFor="fname">Email</label>
                    </div> */}
                        <div className="col-75">
                            <input type="email" className="form-alignment" name="email" placeholder="Email" onChange={(e) => this.handleChange(e)} /><br /></div>
                        {/* <div className="col-25">
                        <label htmlFor="fname">Password</label>
                    </div> */}

                        <div className="col-75">
                            <input type="password" className="form-alignment" name="password" placeholder="Password" onChange={(e) => this.handleChange(e)} /><br />
                        </div>

                        <button id="send" className="buttonstyle" onClick={e => this.check(e)}>Login</button>
                        <p className="para">New user?</p>
                        <button className="buttonstyle"><a className="line" href="/signup">Signup</a></button>
                    </div>

                </div>
            </div>
        )
    }
}
export default withRouter(LoginDiv);