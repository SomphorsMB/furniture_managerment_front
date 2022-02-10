<template>
<div class="px-16 mt-12">
    <div class="mb-14">
        <v-card class="mx-auto">
            <v-img src="https://media.vogue.in/wp-content/uploads/2019/05/hive-feature.jpg" height="400px"></v-img>
        </v-card>
    </div>
    <filter-search />
    <v-row>
        <v-col cols="3" xl="2" lg="3" md="4" sm="6" xs="12" class="px-2" v-for="product in productDiscount" :key="product.id">
            <!-- <card /> -->
            <product-card :product="product" />
        </v-col>
    </v-row>
    <div class="text-center mt-8">
        <v-pagination v-model="pagination.current" :length="pagination.total" @input="onPageChange" :total-visible="7" color="grey"></v-pagination>
    </div>
</div>
</template>

<script>
import card from '~/components/card.vue'
import filter_search from '../components/filter_search.vue';
import ProductCard from '../components/productCard.vue';
import { mapActions, mapGetters, mapState } from 'vuex';
export default {
    layout: "default",
    components: {
        'card': card,
        'filter-search': filter_search,
        ProductCard
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
        pagination: {
            current: 1,
            total: 0
        },
        productDiscount: []
    }),
    // computed:
    //     mapState(['productDiscount']),
    methods: {
        ...mapActions(['getAllProductDiscount']),
        getDiscount() {
            this.$axios.$get('discount?page=' + this.pagination.current).then((res) => {
                this.productDiscount = res.items;
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

</style>
