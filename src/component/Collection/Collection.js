import React, {useEffect, useState} from 'react'
import {database} from '../../fireBase/FireBase'
import CollectionImage from "../CollectionImage/CollectionImage";

import Style from './Collection.module.css'

const CollectionComponent = props => {
    const [allPathes, setAllPathes] = useState([])

    const getAllPathes = () => {
        const cardPath = database.ref('userData/' + localStorage.getItem('userId') + '/cardCollection')
        cardPath.on('value', (snapshot) => {
            const pathData = snapshot.val()
            setAllPathes(pathData)
        })
    }

    useEffect(() => getAllPathes(), [])


    return (
        <div className={Style.collectionDiv}>

            {
                allPathes ?
                    allPathes.map((pathItem, index) => {
                    return (
                        <CollectionImage key={index} cardPath={pathItem}/>
                    )})
                : <h2 style={{textAlign: 'center'}}>В коллекции нет карт</h2>
            }
        </div>
    )
}

export default CollectionComponent