import React from "react";
import {withRouter} from 'react-router-dom'
import Navbar from "./component/Navbar/Navbar";

import {connect} from "react-redux";
import {autoLogin} from "./redux/actions/auth";

class App extends React.Component{

    componentDidMount() {
        this.props.autoLogin()
    }


    render() {
        return (
            <div className='container'>

                <Navbar />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.authReducer.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))