<template>
    <section>
        <v-select v-model="select" :items="itemSelect" color="C4C4C4" item-text="name" dense solo label="Products" class='select'></v-select>
        <product-management v-show="select === 'Products' || select === ''" />
        <seller-management v-show="select === 'Sellers'" />
    </section>
</template>

<script>
import seller_management from '../components/seller_management.vue';
import product_management from '../components/product_management.vue';
export default {
    name: 'ManagementPage',
    components: {
        'seller-management': seller_management,
        'product-management': product_management
    },
    data() {
        return {
            select: "",
            itemSelect: ["Products", "Sellers"],
        };
    }
}
</script>

<style scoped>
.select {
    margin-top: 20px;
    width: 130px;
}
</style>