import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getOnePhoto} from '../../store/photos'
import { useHistory } from 'react-router-dom';

function OnePhotoPage () {
    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const photo = useSelector(state => state?.photos)[id]
    // console.log('1 COMPONENT HEREEE ***************************', useSelector(state => state.photos)[id])

    useEffect(() => {
        dispatch(getOnePhoto(id))
    },[dispatch, id])

    const handleClick = e => {
        e.preventDefault()
        history.push(`/edit/${id}`)
    }

    return (
        <>
            <h2>{photo.photoName}</h2>
            <img src={`${photo.source}`}></img>
            <span><button onClick={handleClick}>Edit Photo</button></span>
        </>
    )
}

export default OnePhotoPage
