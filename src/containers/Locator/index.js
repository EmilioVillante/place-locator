import React, {useState, useEffect} from 'react';
import Map from '../../integrations/maps/Map';
import Typeahead from '../../components/Typeahead';
import Steps from '../../components/Steps';
import Nav from '../../components/Nav';
import LocationLabel from '../../components/LocationLabel';

/**
 * Container component providing the ability to search for a location and display directions to it.
 */
export default () => {
    const [map, setMap] = useState();
    const [steps, setSteps] = useState();
    const [loadingDirections, setLoadingDirections] = useState();
    const [error, setError] = useState();

    // Instantiate the Map class on the first render of the component
    useEffect(() => setMap(new Map(document.getElementById("map"))), []);

    /**
     * Set the given location as one to display and direct to
     *
     * @param location Details of the selected location
     */
    const selectLocation = async (location) => {
        try {
            setLoadingDirections(true);
            const steps = await map.directTo(location);
            setError(null);
            setSteps(steps);
            setLoadingDirections(false);
        } catch (error) {
            setError(error);
        }
    };

    /**
     * Use the map class to return a list of locations that relate to the given keyword
     *
     * @param keyword A term to search for related locations
     */
    const searchLocation = async (keyword) => {
        try {
            const locations = await map.search(keyword);
            setError(null);
            return locations;
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className="row h-100 no-gutters">
            <section className="col-lg-2 col-3 col-sm-4 px-3 d-flex flex-column pane h-100">
                <Nav loading={loadingDirections}/>
                <Typeahead loadOptions={searchLocation}
                           getOptionValue={(option) => option.place_id}
                           onChange={selectLocation}
                           formatOptionLabel={(location, meta) => (
                               <LocationLabel location={location} meta={meta}/>
                           )}/>
                {error ? (<p className="text-danger mt-3"><small><strong>{error}</strong></small></p>) : null}
                <Steps steps={steps}/>
            </section>
            <div id="map" className="col"/>
        </div>
    )
};