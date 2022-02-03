<template>
<div class="px-16 mt-12">
    <div class="mb-12">
        <v-card class="mx-auto">
            <v-img src="https://media.vogue.in/wp-content/uploads/2019/05/hive-feature.jpg" height="400px"></v-img>
        </v-card>
    </div>
    <!-- <v-card class="contain-filter pt-6 mb-10  pl-12"> -->
    <v-row align="center" class="pl-12">
        <p>Filter Product By:</p>
        <v-col class="d-flex" cols="2" sm="2">
            <v-select clearable placeholder="Min price" :items="price" dense solo v-model="minPrice"></v-select>
        </v-col>
        <v-col class="d-flex" cols="2" sm="2">
            <v-select clearable placeholder="Max price" :items="price" dense solo v-model="maxPrice"></v-select>
        </v-col>
        <v-col class="d-flex" cols="2" sm="2">
            <v-select clearable placeholder="Category" :items="listcategories" dense solo v-model="category"></v-select>
        </v-col>
        <v-col class="d-flex" cols="2" sm="2">
            <v-select clearable placeholder="Brand" :items="listbrands" dense solo v-model="brand"></v-select>
        </v-col>
        <v-col class="d-flex" cols="2" sm="2">
            <v-select clearable placeholder="Size" :items="listsizes" dense solo v-model="size"></v-select>
        </v-col>
    </v-row>
    <!-- </v-card> -->
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

export default {
    components: {
        card
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
