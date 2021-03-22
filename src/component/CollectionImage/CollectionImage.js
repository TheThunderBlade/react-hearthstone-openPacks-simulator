import React, {useEffect} from 'react'
import  { storage} from '../../fireBase/FireBase'
import crypto from 'crypto'
import Style from './CollectionImage.module.css'

const CollectionImage = props => {
    const token = crypto.randomBytes(10).toString('hex');

    const pathReference = storage.ref()

    useEffect(() => {
        pathReference.child(props.cardPath).getDownloadURL()
            .then((url) => {
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
    }, [props.cardPath])


    return (
        <div className={Style.ImageBox}>

            <img className={Style.Image} id={token} alt={token}/>
        </div>
    )
}


export default CollectionImage