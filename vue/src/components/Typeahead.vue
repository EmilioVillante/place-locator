<template>
    <vue-bootstrap-typeahead v-model="query"
                             :data="options"
                             :serializer="(option) => option.name"
                             placeholder="Select..."
                             @hit="$emit('input', $event)">
        <template slot="suggestion" slot-scope="{data}">
            <slot :location="data"></slot>
        </template>
    </vue-bootstrap-typeahead>
</template>

<script>
    import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'

    export default {
        name: 'Typeahead',
        props: {
            loadOptions: {
                type: Function,
                default: () => {}
            },
            delay: {
                type: Number,
                default: 300
            }
        },
        data () {
            return {
                query: '',
                options: [],
            }
        },
        watch: {
            query: async function(query) {
                this.options = await this.loadOptions(query);
            }
        },
        components: {VueBootstrapTypeahead}
    }
</script>