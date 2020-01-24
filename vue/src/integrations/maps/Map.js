
/**
 * Defines a Google Maps definition of a given latitude and longitude.
 * @param lat The latitude defined
 * @param lng The longitude defined
 *
 * @returns {window.google.maps.LatLng}
 */
const getGoogleLatLng = (lat, lng) => {
    if (window.google) {
        return new window.google.maps.LatLng(lat, lng);
    } else {
        throw new Error('Google services not loaded')
    }
};

/**
 * Get an {@link google.maps.LatLng} representation of the users current location.
 */
export const getUserCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => resolve(getGoogleLatLng(position.coords.latitude, position.coords.longitude)),
                (error) => reject(error),
                {timeout: 5000});
        } else {
            reject('Geolocation not supported.');
        }
    });
};

/**
 * Defines functionality to interact with google maps and places services.
 */
export default class Maps {
    constructor(mapElement) {
        try {
            this.userLocation = getGoogleLatLng(process.env.VUE_APP_FALLBACK_LAT, process.env.VUE_APP_FALLBACK_LNG);

            // Instantiate google map services
            this.map = new window.google.maps.Map(mapElement, {center: this.userLocation, zoom: 15});
            this.places = new window.google.maps.places.PlacesService(this.map);
            this.directionsService = new window.google.maps.DirectionsService();
            this.directionsRenderer = new window.google.maps.DirectionsRenderer();
            this.directionsRenderer.setMap(this.map);

            getUserCurrentPosition()
                .then((userLocation) => {
                    this.userLocation = userLocation;
                    this.map.setCenter(userLocation);
                })
        } catch(error) {
            console.log(error);
        }
    }

    /**
     * Find a list of places around the user that relate to a given keyword.
     *
     * @param keyword The term to find related places
     */
    search = (keyword) => {
        let request = {
            keyword,
            location: this.userLocation,
            radius: 10000
        };
        return new Promise((resolve, reject) => {
            this.places.nearbySearch(request, (results, status) => {
                if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
                    return reject(status)
                }
                resolve(results);
            })
        });
    };

    /**
     * Direct from the users current location to a given location.
     * This will set directions to the classes map instance and return an array of steps to get to the location.
     *
     * @param location The location to get directions to
     */
    directTo = (location) => {
        return new Promise((resolve, reject) => {
            if (!location) {
                reject('No location was given to direct to');
            }

            const request = {
                origin: this.userLocation,
                destination: getGoogleLatLng(location.geometry.location.lat(), location.geometry.location.lng()),
                travelMode: 'DRIVING'
            };

            this.directionsService.route(request, (result, status) => {
                if (status !== window.google.maps.DirectionsStatus.OK) {
                    return reject(status)
                }
                this.directionsRenderer.setDirections(result);

                if (result && result.routes[0] && result.routes[0].legs[0] && result.routes[0].legs[0].steps) {
                    resolve(result.routes[0].legs[0].steps)
                } else {
                    reject(`Could not get directions to ${location.name}`)
                }
            });
        });
    };
}