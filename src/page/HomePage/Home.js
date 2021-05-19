import React, {useEffect, useState} from 'react'
import Style from './Home.module.css'
import {connect} from 'react-redux'

import {addPoints, annulPoints} from '../../redux/actions/actions'
import {database} from '../../fireBase/FireBase'

const HomePage = props => {

    const [points, setPoints] = useState(null)

    const getPointsFromDB = () =>{
        const points = database.ref('userData/' + localStorage.getItem('userId') + '/points')
        points.on('value', (snapshot) => {
            const data = snapshot.val()
            setPoints(data)
        })
    }

    useEffect(() => getPointsFromDB(), [])

    const userData = points + props.points

    function userDataHandler() {
        database.ref('userData/' + localStorage.getItem('userId') + '/points')
            .set(userData)
    }


    return (
        <div className="pt-3 pb-2">
            <h1>Кликай и получай баллы</h1>

            <div className={Style.GameBox}>

                <div className={Style.Clicker} onClick={props.onAdd}>

                </div>

                <div className={Style.RulesBox}>
                        {
                            props.isAuthenticated ?
                                <div>
                                    <h3>Золото: {props.points}</h3>
                                    <button onClick={() => {
                                        userDataHandler()
                                        props.annulPoints()
                                    }} className="btn-success p-2">Перенести золото в хранилище</button>
                                </div>
                                : <h3>Зарегистрируйтесь для начала игры</h3>
                        }

                    <div>
                        <h3>Правила</h3>
                        <hr/>
                        <p>Кликай на белое поле и зарабатывай баллы. Как соберёшь определённое количество, то сможешь
                            перенести
                            в хранилище и купить пак.</p>
                    </div>

                </div>
            </div>

        </div>
    )
}

function mapStateToProps(state) {
    return {
        points: state.pointCounter.points,
        isAuthenticated: !!state.authReducer.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onAdd: () => dispatch(addPoints()),
        annulPoints: () => dispatch(annulPoints())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)