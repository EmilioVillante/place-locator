import React from 'react';
import Async from 'react-select/async';
import PropTypes from 'prop-types';
import debounce from 'debounce-promise';

/**
 * React select wrapper with a debounced input for fetch options
 */
const Typeahead = ({loadOptions, onChange, formatOptionLabel, delay, getOptionValue}) => {
    // Debounce the select loadOptions call to prevent unnecessary api calls
    const debouncedOptions = debounce(loadOptions, delay);

    return (
        <Async loadOptions={debouncedOptions}
               onChange={onChange}
               getOptionValue={getOptionValue}
               formatOptionLabel={formatOptionLabel}/>
    )
};

Typeahead.propTypes = {
    /**
     * Async method to return a list of data to display as options within the dropdown list.
     */
    loadOptions: PropTypes.func,

    /**
     * Callback for the action of selecting an option.
     */
    onChange: PropTypes.func,

    /**
     * Method to render option in the dropdown list and the selected option in the searchbar.
     */
    formatOptionLabel: PropTypes.func,

    /**
     * Optional millisecond delay for requesting options after the user has finished typing.
     */
    delay: PropTypes.number,

    /**
     * Method to resolves option data to a string for comparison against the selected option.
     */
    getOptionValue: PropTypes.func,
};

Typeahead.defaultProps = {
    loadOptions: () => {},
    onChange: () => {},
    formatOptionLabel: () => {},
    delay: 300,
    getOptionValue: (option) => option
};

export default Typeahead;