import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getOnePhoto, getAllPhotos} from '../../store/photos'

function OnePhotoPage () {
    const {id} = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const photo = useSelector(state => state?.photos)[id]
    // console.log('1 COMPONENT HEREEE ***************************', useSelector(state => state.photos)[id])

    useEffect(() => {
        dispatch(getOnePhoto(id))
    },[dispatch, id])

    return (
        <>
            <div>insert photo here</div>
            <img src={`${photo.source}`}></img>
        </>
    )
}

export default OnePhotoPage
