import React from 'react';
import Axios from 'axios';
import Drawer from '../components/drawer';
import { BrowserRouter as withRouter } from 'react-router-dom';
class Homepage extends React.Component {
    logout = () => {
        this.props.history.push('/');
        sessionStorage.clear()
    }
    render() {
        return (<div>
            <Drawer logout={this.logout}></Drawer>
        </div>)
    }
}
export default (Homepage);