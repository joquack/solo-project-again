import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../Navigation';
import * as sessionActions from "../../store/session";
import './SplashPhotos/splashPage.css'

function SplashPage() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
    <>
        <div className='banner'>
            <Navigation isLoaded={isLoaded}/>
            <h1>Splash page here</h1>
        </div>
    </>
    )
}

export default SplashPage
