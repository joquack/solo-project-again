import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import PhotosPage from "./components/PhotosPage";
import OnePhotoPage from "./components/OnePhotoPage";
import CreatePhotoPage from "./components/CreatePhotoPage";
import EditPhotoPage from "./components/EditPhotoPage";
import SplashPage from "./components/SplashPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <SplashPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route exact path='/photos'>
            <PhotosPage />
          </Route>

          <Route path='/create'>
            <CreatePhotoPage />
          </Route>

          <Route path='/photos/:id'>
            <OnePhotoPage />
          </Route>

          <Route path='/edit/:id'>
            <EditPhotoPage />
          </Route>

          <Route path=''>
            <h1>Page Not Found</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
