import React from 'react';

/**
 * Render UI to display a loading state for a full page
 */
export default () => (
    <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
)