import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {getAllPhotos} from '../../store/photos'

function PhotosPage () {
    const [allPhotos, setAllPhotos] = useState([])
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const photosObj = useSelector(state => state.photos)
    // const photos = Object.values(photosObj)
    useEffect(() => {
        if(photosObj)
            setAllPhotos(Object.values(photosObj))
    }, [photosObj])

    console.log('HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', allPhotos, 'HEREEEEE')

    useEffect(() => {
        dispatch(getAllPhotos())
    }, [dispatch])

    return (
        <>
        <h2>All Photos</h2>
        <div>
            {allPhotos.map(img => {
                return <img src={`${img.source}`}></img>
            })}
        </div>
        </>
    )
}

export default PhotosPage
