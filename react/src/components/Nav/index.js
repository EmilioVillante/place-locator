import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../../integrations/firebase/FirebaseContext';

/**
 * Render UI to display a header consisting of the application name and an ability for the current user to sign out
 */
const Nav = ({loading}) => {
    const firebase = useContext(FirebaseContext);

    return (
        <header className="row d-flex justify-content-between no-gutters my-3">
            <div className="d-flex align-items-center">
                <h1>{process.env.REACT_APP_TITLE}</h1>
                {loading ? (
                    <div className="spinner-border ml-3 spinner-border-sm text-secondary">
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : null}
            </div>
            <button onClick={firebase.signOut} className="btn btn-light btn-sm">Sign Out</button>
        </header>
    )
};

Nav.propTypes = {
    /**
     * Boolean state where true will add a loading spinner next to the application name
     */
    loading: PropTypes.bool,
};

export default Nav;