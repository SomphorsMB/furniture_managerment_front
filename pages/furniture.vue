<template>
<div class="mt-12 px-16">
    <div class="mb-12">
        <v-card class="mx-auto">
            <v-img src="https://media.vogue.in/wp-content/uploads/2019/05/hive-feature.jpg" height="400px"></v-img>
        </v-card>
    </div>
    <filter-search />
    <v-row >
        <v-col cols="3" xl="2" lg="3" md="4" sm="6" xs="12" class="px-2" v-for="product in products" :key="product.product_id">
            <!-- <card /> -->
            <product-card :product="product"/>
        </v-col>
    </v-row>
    <div class="text-center mt-4">
        <v-pagination v-model="page" :length="3" color="grey"></v-pagination>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import card from '~/components/card.vue'
import filter_search from '~/components/filter_search.vue';
import ProductCard from '../components/productCard.vue';

export default {
    layout: "default",
    components: {
        'card': card,
        'filter-search': filter_search,
        ProductCard
    },
    data: () => ({
        page: 1,
    }),
    computed:
        mapState(['products']),
    methods: {
        ...mapActions(['getAllProduct']),
    },
    mounted(){
        this.getAllProduct();
    }
}
</script>

<style scoped>

</style>
