import React, {useState, useEffect} from 'react'
import {NavLink, Redirect, Route, Switch} from 'react-router-dom'

import  './Navbar.css'
import {connect} from 'react-redux'

import PackStore from "../../page/PackPage/PackStore";
import HomePage from "../../page/HomePage/Home";
import AuthPage from "../../page/AuthPage/AuthPage";
import UserPage from "../../page/UserPage/UserPage";
import Logout from "../Logout/Logout";
import {database} from "../../fireBase/FireBase";
import OpenCardPage from "../../page/OpenCardCollect/OpenCardPage";


const Navbar = props => {

    const [points, setPoints] = useState(null)

    const getPointsFromDB = () =>{
        const points = database.ref('userData/' + localStorage.getItem('userId') + '/points')
        points.on('value', (snapshot) => {
            const data = snapshot.val()
            setPoints(data)
        })
    }

    useEffect(() => {
        getPointsFromDB()
        return {}
    }, [])


    let routes = (
        <Switch>
            <Route path='/packStore' component={PackStore}/>
            <Route path='/authPage' component={AuthPage}/>
            <Route path='/userPage' component={UserPage}/>
            <Route path='/logout' component={Logout}/>

            <Route path='/:name' component={OpenCardPage}/>


            <Route path='/' exact component={HomePage}/>
            <Redirect to={'/'}/>
        </Switch>
    )

    return (
        <div className="Navbar">

            <ul className="nav justify-content-end pb-3">
                <li>
                    <h3 className="mr-5">Золото в хранилище: {points}</h3>
                </li>
                <li className="nav-item mr-1">
                    <NavLink exact className="nav-link" to='/'>Главная</NavLink>
                </li>
                <li className="nav-item mr-1">
                    <NavLink className="nav-link" to='/packStore'>Магазин паков</NavLink>
                </li>
                {
                    props.isAuthenticated ?
                        <li className="nav-item mr-1">
                            <NavLink className="nav-link" to='/userPage'>Аккаунт</NavLink>
                        </li>
                        : null
                }

                {
                    !props.isAuthenticated ?
                        <li className="nav-item mr-1">
                            <NavLink className="nav-link" to='/authPage'>Авторизация</NavLink>
                        </li>
                        :
                        <li className="nav-item mr-1">
                            <NavLink className="nav-link" to='/logout'>Выход</NavLink>
                        </li>
                }
            </ul>
            {routes}
        </div>
    )
}

const mapStateToProps = state =>{
    return {
        isAuthenticated: !!state.authReducer.token
    }
}

export default connect(mapStateToProps)(Navbar)