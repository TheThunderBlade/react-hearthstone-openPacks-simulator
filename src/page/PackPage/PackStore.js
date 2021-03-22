import React, {useEffect, useState} from 'react'
import PriestPack from '../../StaticImages/PriestCardback.png'
import MagePack from '../../StaticImages/MageCardback.png'
import './PackStore.css'
import {NavLink} from "react-router-dom";

import {connect} from 'react-redux'

import {database} from "../../fireBase/FireBase";

const PackStore = props => {

    const [points, setPoints] = useState(null)

    const packData = [
        {
            packPath: 'PriestPack',
            packCardBack: PriestPack
        },
        {
            packPath: 'MagePack',
            packCardBack: MagePack
        }
    ]

    const getPointsFromDB = () => {
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

    const buyPack = () => {
        database.ref('userData/' + localStorage.getItem('userId') + '/points')
            .set(points - 100)

    }

    const renderLinks = name => {
        return (
            <NavLink onClick={() => buyPack()} className="btn btn-outline-success" to={`/${name}`}>Открыть пак</NavLink>
        )
    }

    return (
        <div>
            <h1>Магазин паков</h1>

            <div className="row">

                {
                    packData.map((packItem,index) => {
                        return (
                            <div key={index} className="col-6 p-1 PackDiv">
                                <img src={packItem.packCardBack} alt={packItem.packPath}/>
                                {
                                    props.isAuthenticated ?
                                        points >= 100 ?
                                            renderLinks(packItem.packPath)
                                            : <h3>НУЖНО БОЛЬШЕ ЗОЛОТА</h3>
                                        : <h3>Авторизируйтесь для покупки</h3>
                                }

                            </div>
                        )
                    })
                }

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


export default connect(mapStateToProps, null)(PackStore)