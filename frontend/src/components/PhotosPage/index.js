import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {getAllPhotos} from '../../store/photos'

function PhotosPage () {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const photos = Object.values(useSelector(state => state.photos))

    // const [allPhotos, setAllPhotos] = useState([])
    // const photos = Object.values(photosObj)
    // useEffect(() => {
    //     if(photosObj)
    //         setAllPhotos(Object.values(photosObj))
    // }, [photosObj])

    useEffect(() => {
        dispatch(getAllPhotos())
    }, [dispatch])

    return (
        <>
        <h2>All Photos</h2>
        <div>
            {photos.map(img => {
                return <img src={`${img.source}`}></img>
            })}
        </div>
        </>
    )
}

export default PhotosPage
