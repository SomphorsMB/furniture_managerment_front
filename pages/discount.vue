<template>
<div class="px-16 mt-12">
    <div class="mb-14">
        <v-card class="mx-auto">
            <v-img src="https://media.vogue.in/wp-content/uploads/2019/05/hive-feature.jpg" height="400px"></v-img>
        </v-card>
    </div>
    <filter-search @filter="filter" />
    <v-row>
        <v-col cols="3" xl="2" lg="3" md="4" sm="6" xs="12" class="px-2" v-for="product in listproducts" :key="product.id">
            <product-card :product="product" />
        </v-col>
        <div class="empty_product grey--text">
            <h2 v-show="listproducts.length == 0">No result found here.</h2>
        </div>
    </v-row>
    <div class="text-center mt-8">
        <v-pagination v-model="pagination.current" :length="pagination.total" @input="onPageChange" :total-visible="7" color="grey"></v-pagination>
    </div>
</div>
</template>

<script>
import filter_search from '../components/filter_search.vue';
import ProductCard from '../components/productCard.vue';
import { mapActions, mapState } from 'vuex';
export default {
    layout: "default",
    components: {
        'filter-search': filter_search,
        ProductCard
    },
    data: () => ({
        filters:{min:null,max:null,category:null,size:null,brand:null},
        listproducts:[],
        // products: [],
        page: 1,
        pagination: {
            current: 1,
            total: 0
        },
        productDiscount: []
    }),
    watch:{
        search(){
            this.searching(this.search,this.filters);
        },
    },
    computed:
        mapState(['search']),
    methods: {
        ...mapActions(['getAllProductDiscount']),
        filter(value){
            this.filters = value;
            this.searching(this.search,value);
        },
        searching(search,filter){
            this.listproducts = this.productDiscount;
            if(!(filter.min === null || filter.min==='')){
                this.listproducts = this.listproducts.filter(product => product.productDetail_price >= filter.min);
            }
            if(!(filter.max === null || filter.max==='')){
                this.listproducts = this.listproducts.filter(product => product.productDetail_price <= filter.max );
            }
            if(!(filter.brand === null || filter.brand.brand === '') ){
                this.listproducts = this.listproducts.filter(product => product.supplier_brand.includes(filter.brand.brand));
            }
            if(!(filter.category === null || filter.category.name ==='')){
                this.listproducts = this.listproducts.filter(product => product.category_name.includes(filter.category.name));
            }
            if(!(filter.size === null || filter.size ==='')){
                this.listproducts = this.listproducts.filter(product => product.productDetail_size.includes(filter.size));
            }
            if(!(search === null || search ==='')){
                this.listproducts = this.listproducts.filter(product => product.product_name.toLowerCase().includes(search.toLowerCase()));
            }
        },
        getDiscount() {
            this.$axios.$get('products/discount-products?page=' + this.pagination.current).then((res) => {
                this.productDiscount = res.items;
                this.listproducts = this.productDiscount;
                this.searching(this.search,this.filters);
                this.pagination.current = res.meta.currentPage;
                this.pagination.total = res.meta.totalPages;
            })
        },
        onPageChange() {
            this.getDiscount();
        },
    },
    mounted(){
        this.getDiscount();
    }
}
</script>

<style scoped>
.empty_product{
    margin-left: 42%;
}
</style>
