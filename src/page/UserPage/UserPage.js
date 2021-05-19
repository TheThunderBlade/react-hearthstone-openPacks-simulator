import React from "react";
import Collection from "../../component/Collection/Collection";
import {connect} from "react-redux";

import Style from './UserPage.module.css'

const UserPage = props => {
    return(
        <div>
            <h1 className="text-center"><small>Имя пользователя:</small> {
                props.isAuthenticated ?
                    localStorage.getItem('userName')
                    : <p>Некорректная авторизация</p>
            }</h1>

            <h3 className="text-center"><small>ID пользователя:</small> {
                props.isAuthenticated ?
                    <p className={Style.userId}>{localStorage.getItem('userId')}</p>
                    : <p>Некорректная авторизация</p>
            }</h3>

            {
                props.isAuthenticated ?
                    <div>
                        <h1 className="text-center mt-5">Коллекция:</h1>
                        <Collection/>
                    </div>
                    : null
            }
        </div>
    )
}

const mapStateToProps = state =>{
    return {
        isAuthenticated: !!state.authReducer.token
    }
}

export default connect(mapStateToProps)(UserPage)