import React, {useState, useContext} from 'react';
import Login from './Login';
import Locator from './Locator';
import PageLoading from '../components/PageLoading';
import FirebaseContext from '../integrations/firebase/FirebaseContext';

/**
 * Application page routing and loading before firebase has stated if there is a user
 */
const App = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const firebase = useContext(FirebaseContext);

    // Hook into firebase authentication change event to determine if a user exists
    firebase.auth.onAuthStateChanged((user) => {
        setUser(user);
        setLoading(false)
    });

    // Display the Locator page if there is an authenticated user, otherwise, display the Login page
    const Route = user ? Locator : Login;
    return loading ? (<PageLoading/>) : (<Route/>)
};

export default App;