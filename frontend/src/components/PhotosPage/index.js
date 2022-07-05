import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPhotos } from '../../store/photos'
import Navigation from '../Navigation';
import * as sessionActions from "../../store/session";
import './index.css'

import './index.css'
function PhotosPage() {
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
        <Navigation isLoaded={isLoaded} />
        <h2>All Photos</h2>
        {user && <Link to='/create'>Create A New Photo</Link>}

        <div className='container'>
            {photos && photos.map(img => {
                return <div key={img.id} className='gallery-container'>
                    <div className='gallery-item'>
                        <Link to={`/photos/${img.id}`}><img className='image' src={`${img.source}`}></img></Link>
                    </div>
                </div>
            })}
        </div>
        </>
    )
}

export default PhotosPage
