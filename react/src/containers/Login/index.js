import React, {useContext} from 'react';
import GoogleButton from 'react-google-button'
import FirebaseContext from '../../integrations/firebase/FirebaseContext';

/**
 * Render UI to display functionality for a user to log in to the application through google authentication.
 */
export default () => {
    const firebase = useContext(FirebaseContext);
    return (
        <div className="container d-flex mt-3 justify-content-center flex-column">
            <h1 className="text-center mb-1">Finder!</h1>
            <h5 className="text-center mb-5">Find a location and get directions to it.</h5>
            <div className="d-inline-flex justify-content-center">
                <GoogleButton onClick={firebase.googleSignIn}/>
            </div>
        </div>
    )
};