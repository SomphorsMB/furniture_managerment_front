<template>
<div class="mt-12 px-16">
    <div class="mb-12">
        <v-card class="mx-auto">
            <v-img src="https://media.vogue.in/wp-content/uploads/2019/05/hive-feature.jpg" height="400px"></v-img>
        </v-card>
    </div>
    <filter-search />
    <v-row>
        <v-col cols="3" xl="2" lg="3" md="4" sm="6" xs="12" class="px-2" v-for="m in 12" :key="m">
            <card />
        </v-col>
    </v-row>
    <div class="text-center mt-4">
        <v-pagination v-model="page" :length="3" color="grey"></v-pagination>
    </div>
</div>
</template>

<script>
import card from '~/components/card.vue'
import filter_search from '~/components/filter_search.vue';

export default {
    components: {
        'card': card,
        'filter-search': filter_search
    },
    data: () => ({
        page: 1,
    }),
    methods: {}
}
</script>

<style scoped>

</style>
