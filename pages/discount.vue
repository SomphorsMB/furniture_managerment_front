<template>
<div class="px-16 mt-12">
    <div class="mb-14">
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
import filter_search from '../components/filter_search.vue';

export default {
    components: {
        'card': card,
        'filter-search': filter_search
    },
    data: () => ({
        show: false,
        price: [10, 50, 100, 200, 1000],
        listcategories: ['Table', 'Desk', 'Sofa', 'Lamp'],
        listbrands: ['addidas', 'predo', 'gucci'],
        listsizes: ['small', 'medium', 'large'],
        page: 1,
        minPrice: null,
        maxPrice: null,
        category: null,
        brand: null,
        size: null,
    }),
    methods: {}
}
</script>

<style scoped>

</style>
