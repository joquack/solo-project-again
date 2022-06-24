import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getOnePhoto} from '../../store/photos'

function OnePhotoPage () {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const photo = Object.values(useSelector(state => state.photos))
    console.log(photo)
    const {id} = useParams()

    useEffect(() => {
        dispatch(getOnePhoto(id))
    },[dispatch])

    return (
        <>
        <div>insert photo here</div>

        </>
    )
}

export default OnePhotoPage
