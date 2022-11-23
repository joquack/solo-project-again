import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
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
    const [searhInput, setSearchInput] = useState('')

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllPhotos())
    }, [dispatch])

    return (
        <>
        <div className='photo-page-header'>
            <div>
                <NavLink exact to="/">Home</NavLink>
            </div>

            <div>
                <Navigation isLoaded={isLoaded} />
            </div>

            <div>
                <h2>All Photos</h2>
            </div>

            <div>
                <input className='searchbox' placeholder='Looking for a photo?' onChange={e => setSearchInput(e.target.value)}/>
            </div>
        </div>

        {user && <Link to='/create'>Create A New Photo</Link>}

        <div className='container'>
            {/* eslint-disable-next-line*/}
            {photos && photos.filter(photo => {
                if (searhInput === ''){
                    return photo
                }
                else if (photo.photoName.toLowerCase().includes(searhInput.toLowerCase())){
                    return photo
                }
            }).map((img, index) => {
                return <div key={index} className='gallery-container'>
                <div className='gallery-item'>
                    <Link to={`/photos/${img.id}`}><img className='image' src={`${img.source}`} alt='link-to-img-page'></img></Link>
                </div>
            </div>
            })
            }
        </div>

        </>
    )
}

export default PhotosPage
