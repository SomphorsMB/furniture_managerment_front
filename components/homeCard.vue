<template>
<section class="mt-10 mx-auto">
    <v-card-title>
        <h2 class="mx-auto">{{ data.title }}</h2>
    </v-card-title>
    <div class="d-flex justify-center flex-wrap mx-auto mx-0 px-0">
        <!-- <product-card v-for="n of 4" :key="n" /> -->
        <v-row>
            <v-col cols="3" xl="2" lg="3" md="4" sm="6" xs="12" class="px-2" v-for="m in 4" :key="m">
                <product-card :status="data.title" />
            </v-col>
        </v-row>
    </div>
    <v-card-actions>
        <v-btn class="ma-2 mx-auto rounded-0 py-4 mt-6" width="18%" outlined color="black" :to="data.to">
            View All
        </v-btn>
    </v-card-actions>
</section>
</template>

<script>
import productCard from './productCard.vue'
export default {
    components: {
        productCard
    },
    props: ['data'],

}
</script>

<style scoped>
section {
    width: 94%;
}
</style>
