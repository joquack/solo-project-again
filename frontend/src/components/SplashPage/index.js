import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../Navigation';
import * as sessionActions from "../../store/session";
import './SplashPhotos/splashPage.css'
import { Link } from 'react-router-dom';

function SplashPage() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
    <>
        <div className='banner'>
            <div className='navbar'>
                <ul>
                    <li>Splash page here</li>
                    <li><Link to='/photos'>All Photos</Link></li>
                    <li><Navigation isLoaded={isLoaded}/></li>
                </ul>
        </div>
        </div>
    </>
    )
}

export default SplashPage
