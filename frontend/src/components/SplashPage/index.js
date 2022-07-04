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
                    <h2 className='topbar'>Splash page here</h2>
                    <h2 className='topbar'><Link to='/photos'>Explore All Photos</Link></h2>
                <div>
                    <div><Navigation isLoaded={isLoaded}/></div>
                </div>
        </div>
        </div>
    </>
    )
}

export default SplashPage
