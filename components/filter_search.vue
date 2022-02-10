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
    emits:['filter'],
    data: () => ({
        price: [1,5,10,50, 100, 200,500,1000,2000],
        sizes: ['Small', 'Medium', 'Large'],
        minPrice: null,
        maxPrice: null,
        category: null,
        brand: null,
        size: null,
        filter:{min:null,max:null,category:null,size:null,brand:null},
    }),
    watch:{

        minPrice(){
            this.filter.min= this.minPrice;
            this.$emit('filter',this.filter);
        },
        maxPrice(){
            this.filter.max= this.maxPrice;
            this.$emit('filter',this.filter);
        },
        category(){
            this.filter.category= this.category;
            this.$emit('filter',this.filter);
        },
        brand(){
            this.filter.brand= this.brand;
            this.$emit('filter',this.filter);
        },
        size(){
            this.filter.size= this.size;
            this.$emit('filter',this.filter);
        },
        
    },
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
