import React from 'react';
import PropTypes from 'prop-types';

/**
 * Render UI to display google map directions from one location to another
 */
const Steps = ({steps}) => {
    if (!steps.length) {
        return null;
    }

    return (
        <div className="row py-3 overflow-auto flex-grow-1 flex-shrink-1 no-gutters flex-column flex-nowrap">
            {steps.map((step) => (
                <div key={step.encoded_lat_lngs} className="mb-2 border rounded p-2 bg-white shadow-sm">
                    <p dangerouslySetInnerHTML={{__html: step.instructions}}/>
                    {step.distance ? (
                        <span className="text-muted" dangerouslySetInnerHTML={{__html: step.distance.text}}/>
                    ) : null}
                </div>
            ))}
        </div>
    );
};

Steps.propTypes = {

    /**
     * Directions to display.
     */
    steps: PropTypes.arrayOf(PropTypes.object),
};

Steps.defaultProps = {
    steps: []
};

export default Steps;