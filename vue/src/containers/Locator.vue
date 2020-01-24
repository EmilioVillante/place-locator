<template>
    <div class="row h-100 no-gutters">
        <section class="col-4 px-3 d-flex flex-column pane h-100">
            <Nav :loading="loadingDirections"/>
                <Typeahead :loadOptions="searchLocations"
                           v-model="location">
                    <template slot slot-scope="{location}">
                        <LocationLabel :location="location"/>
                    </template>
                </Typeahead>
                <p v-if="error" class="text-danger mt-3"><small><strong>{{error}}</strong></small></p>
                <Steps :steps="steps"/>
        </section>
        <div id="map" class="col"/>
    </div>
</template>

<script>
    import Nav from '../components/Nav';
    import Steps from '../components/Steps';
    import Typeahead from '../components/Typeahead';
    import Map from "../integrations/maps/Map";
    import LocationLabel from "../components/LocationLabel";

    export default {
        name: 'Locator',
        data: function() {
            return {
                map: undefined,
                steps: undefined,
                location: undefined,
                loadingDirections: false,
                error: undefined,
            }
        },
        watch: {
            location: async function(current) {
                try {
                    this.loadingDirections = true;
                    this.steps = await this.map.directTo(current);
                    this.error = undefined;
                    this.loadingDirections = false;
                } catch(error) {
                    this.error = error;
                }
            }
        },
        methods: {
            searchLocations: async function(keyword) {
                try {
                    const locations = await this.map.search(keyword);
                    this.error = undefined;
                    return locations;
                } catch(error) {
                    this.error = error;
                }
            }
        },
        mounted: function() {
            this.map = new Map(document.getElementById("map"));
        },
        components: {Nav, Steps, Typeahead, LocationLabel}
    }
</script>