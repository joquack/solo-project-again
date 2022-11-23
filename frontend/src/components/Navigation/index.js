import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div className='navigation'>
        <div className='login'>
          <NavLink to="/login">Log In</NavLink>
        </div>

        <div className='signup'>
          <NavLink to="/signup">Sign Up</NavLink>
        </div>
      </div>
    );
  }

  return (
    <ul>
      <li>
        {/* <NavLink exact to="/">Home</NavLink> */}
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
