import React, {useEffect} from 'react'
import {storage} from '../../fireBase/FireBase'
import crypto from 'crypto'
import Style from './Image.module.css'
import {connect} from "react-redux";
import {setCardPath} from "../../redux/actions/cardActions";

const Image = props => {

    const cardRarity = ['Common', 'Common', 'Common', 'Common', 'Rare', 'Rare', 'Rare', 'Epic', 'Epic', 'Legendary']

    const token = crypto.randomBytes(10).toString('hex');

    const randonImgNum = () => {
        const min = 1;
        const max = 11;
        const rand = Math.floor(min + Math.random() * (max - min));

        return rand
    };

    const randomCardRarity = () => {
        const min = 0;
        const max = cardRarity.length;
        const rand = Math.floor(min + Math.random() * (max - min));

        return cardRarity[rand]
    }

    const cardPath = `${props.packName}/${randomCardRarity()}/${randonImgNum()}.png`
    const pathReference = storage.ref()

    useEffect(() => {
        pathReference.child(cardPath).getDownloadURL()
            .then((url) => {
                props.setCardPath(cardPath)
                let xhr = new XMLHttpRequest();

                xhr.responseType = 'blob';
                xhr.onload = (event) => {
                    let blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.send();

                let img = document.getElementById(token);
                img.setAttribute('src', url);
            })
            .catch(e => {
                console.log(e)
            })
    }, [])


    return (
        <div>
            <img className={Style.Image} id={token} alt={token}/>
        </div>
    )
}

function mapDispatchToProps(dispatch){
    return{
        setCardPath: (cardPath) => dispatch(setCardPath(cardPath))
    }
}

export default connect(null, mapDispatchToProps)(Image)