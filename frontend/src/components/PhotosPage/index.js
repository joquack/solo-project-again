import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {getAllPhotos} from '../../store/photos'
import Navigation from '../Navigation';
import * as sessionActions from "../../store/session";

import './index.css'
function PhotosPage () {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const photos = Object.values(useSelector(state => state?.photos)).reverse()

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

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
        <Navigation isLoaded={isLoaded}/>
        <h2>All Photos</h2>
        <Link to='/create'>Create A New Photo</Link>
        <div>
            <ul>
            {photos && photos.map(img => {
                return <li key={img.id}><Link to={`/photos/${img.id}`}><img src={`${img.source}`}></img></Link></li>
            })}
            </ul>
        </div>
        </>
    )
}

export default PhotosPage
