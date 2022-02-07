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
            <v-select clearable placeholder="Category" :items="categories" item-text="name" dense solo v-model="category" return-object></v-select>
        </v-col>
        <v-col class="d-flex" cols="2" sm="2">
            <v-select clearable placeholder="Brand" :items="brands" item-text="brand" dense solo v-model="brand" return-object></v-select>
        </v-col>
        <v-col class="d-flex" cols="2" sm="2">
            <v-select clearable placeholder="Size" :items="sizes" dense solo v-model="size"></v-select>
        </v-col>
    </v-row>
</template>

<script>
import {mapActions,mapState} from 'vuex';
export default {
    data: () => ({
        price: [10, 50, 100, 200, 1000],
        sizes: ['small', 'medium', 'large'],
        minPrice: null,
        maxPrice: null,
        category: null,
        brand: null,
        size: null,
    }),
    computed:{
        ...mapState(['brands','categories'])
    },
    methods: {
        ...mapActions(['getAllCategories','getAllBrands'])
    },
    mounted(){
        this.getAllCategories();
        this.getAllBrands();
    }
}
</script>

<style scoped>

</style>
