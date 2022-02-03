<template>
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
</template>

<script>
export default {
    data: () => ({
        price: [10, 50, 100, 200, 1000],
        listcategories: ['Table', 'Desk', 'Sofa', 'Lamp'],
        listbrands: ['addidas', 'predo', 'gucci'],
        listsizes: ['small', 'medium', 'large'],
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
