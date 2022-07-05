import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../Navigation';
import * as sessionActions from "../../store/session";
import './SplashPhotos/splashPage.css'
import { Link } from 'react-router-dom';

function SplashPage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [isLoaded, setIsLoaded] = useState(false);
    const [credential, setCredential] = useState('demo@user.io');
    const [password, setPassword] = useState('password');

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        return await dispatch(sessionActions.login({ credential, password }))
      }

    return (
    <>
        <div className='banner'>
            <div className='navbar'>
                <div>
                    <img className='navbarbanner' src={require('./SplashPhotos/duckbanner.png')}></img>
                    <span className='welcome'>Welcome to Stickr</span>
                </div>
                    <h2 className='topbar'><Link to='/photos'>Explore All Photos</Link></h2>
                <div>
                        {!user && <button className='demo-user' onClick={handleSubmit}>Demo User</button>}
                    <div>
                        <Navigation isLoaded={isLoaded}/>
                    </div>
                </div>
        </div>
        </div>
    </>
    )
}

export default SplashPage
