import React, {useEffect, useState} from "react";
import Image from "../../component/Image/Image";
import {connect} from "react-redux";
import {database} from "../../fireBase/FireBase";
import {annulCardPath} from "../../redux/actions/cardActions";

const OpenCardPage = props => {

    const [oldPathes, setOldPathes] = useState([])
    const onAddToCollectionHandler = () =>{
        props.history.push('/')
    }

    const getCardPath = () => {
        const cardPath = database.ref('userData/' + localStorage.getItem('userId') + '/cardCollection')
        cardPath.on('value', (snapshot) => {
            const pathData = snapshot.val()
            setOldPathes(pathData)
        })
    }

    useEffect(() => {
        getCardPath()
        return {}
    }, [])

    const postCardPath = () => {
        if(oldPathes != null){
            database.ref('userData/' + localStorage.getItem('userId') + '/cardCollection')
                .set(oldPathes.concat(props.cardPath))
        } else {
            database.ref('userData/' + localStorage.getItem('userId') + '/cardCollection')
                .set(props.cardPath)
        }
    }

    const cardClass = props.history.location.pathname.split('/')[1].toString()

    return (
        <div>

            <div style={{display: 'flex', justifyContent: 'space-around'}} className='row'>
                <Image packName={cardClass}/>
                <Image packName={cardClass}/>
                <Image packName={cardClass}/>
            </div>

            <div style={{display: 'flex', justifyContent: 'space-around'}} className='row'>
                <Image packName={cardClass}/>
                <Image packName={cardClass}/>
            </div>

            <div  style={{display: 'flex', justifyContent: 'space-around'}} className='row'>
                <button type="button" onClick={() => {
                    postCardPath()
                    onAddToCollectionHandler()
                    props.annulCardPath()
                }} className="btn btn-success p-4 mt-4">На главную</button>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        cardPath: state.cardPathReducer.cardPath
    }
}

function mapDispatchToProps(dispatch) {
    return {
        annulCardPath: () => dispatch(annulCardPath())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenCardPage)