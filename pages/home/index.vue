<template>

<main>
    <slider />
    <div class="px-16">
        <section class="mt-10 mx-auto">
            <v-card-title>
                <h2 class="mx-auto">Products Discount</h2>
            </v-card-title>
            <div class="d-flex justify-center flex-wrap mx-auto mx-0 px-0">
                <v-row>
                    <v-col cols="3" xl="2" lg="3" md="4" sm="6" xs="12" class="px-2" v-for="(product,index) of productDiscount" :key="index">
                        <product-card v-if="index <= 3" :product="product" />
                    </v-col>
                </v-row>
            </div>
            <v-card-actions>
                <v-btn class="ma-2 mx-auto rounded-0 py-4 mt-6" width="18%" outlined color="black" to="/discount">
                    View All
                </v-btn>
            </v-card-actions>
        </section>
        <section class="mt-10 mx-auto" >
            <v-card-title>
                <h2 class="mx-auto">All Products</h2>
            </v-card-title>
            <div class="d-flex justify-center flex-wrap mx-auto mx-0 px-0">
                <v-row>
                    <v-col cols="3" xl="2" lg="3" md="4" sm="6" xs="12" class="px-2" v-for="(product,index) of products" :key="index">
                        <product-card v-if="index <= 3 " :product="product" />
                    </v-col>
                </v-row>
            </div>
            <v-card-actions>
                <v-btn class="ma-2 mx-auto rounded-0 py-4 mt-6" width="18%" outlined color="black" to="/furniture">
                    View All
                </v-btn>
            </v-card-actions>
        </section>
        <v-card-title>
            <h2 class="mx-auto mt-6">Branding</h2>
        </v-card-title>
        <div class=" mx-auto mx-0 px-0">
            <v-row class="mx-10">
                <v-col cols="3" xl="2" lg="3" md="4" sm="6" xs="12" class="px-2" v-for="m in brands" :key="m.title">
                    <v-img width="70%" class="mx-auto" :src="m.logo"></v-img>
                </v-col>
            </v-row>
        </div>
        <v-card-actions>
            <v-btn class="ma-2 mx-auto rounded-0 py-4 mt-6" width="18%" outlined color="black">
                View All
            </v-btn>
        </v-card-actions>
    </div>
</main>
</template>

<script>
import HomeCard from '~/components/homeCard.vue'
import slider from '~/components/slider.vue'
import { mapActions, mapGetters, mapState } from 'vuex';
export default {
    layout: "default",
    components: {
        slider,
        HomeCard
    },
    data() {
        return {
            products: [],
            productDiscount: [],
            brands: [{
                    name: "asdfghjkl",
                    logo: "https://www.furniturebrandsinternational.co.uk/media/logo/stores/4/logo.png"
                },
                {
                    name: "asdfghjkl",
                    logo: "https://grandluxuryfurniture.com/wp-content/uploads/2019/06/lfd-png-logo.png"
                },
                {
                    name: "asdfghjkl",
                    logo: "https://www.kare-design.com/migrate/img/logo.png"
                },
                {
                    name: "asdfghjkl",
                    logo: "https://www.pinclipart.com/picdir/big/366-3669007_today-nann-is-an-international-brand-of-furniture.png"
                },
            ]
        }
    },
    // computed:
    //     mapState(['productDiscount']),
    methods: {
        // ...mapActions(['getAllProduct']),
        // ...mapActions(['getAllProductDiscount']),
        getAllProduct(){
            this.$axios.$get('products/getAll').then((res) => {
                this.products = res.data
            }).catch((err) => {
                console.log(err);
            })
        },
        getAllProductDiscount(){
            this.$axios.$get('products/discount-products').then((res) => {
                this.productDiscount = res.items
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    mounted(){
        this.getAllProduct();
        this.getAllProductDiscount();

    }

}
</script>

<style scoped>

</style>
