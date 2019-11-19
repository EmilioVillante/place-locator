import React from 'react';
import PropTypes from 'prop-types';

/**
 * Render UI to display basic details of a location within a react select instance.
 */
const LocationLabel = ({location, meta}) => {
    if (!location) {
        return null;
    }
    return (
        <React.Fragment>
            <p><strong>{location.name}</strong></p>
            {meta.context === 'menu' ? (<p>{location.vicinity}</p>) : null}
        </React.Fragment>
    )
};

LocationLabel.propTypes = {
    /**
     * Details of a location to display.
     */
    location: PropTypes.object,

    /**
     * React select meta data of the render context.
     */
    meta: PropTypes.object,
};

export default LocationLabel;