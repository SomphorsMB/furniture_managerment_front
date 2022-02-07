<template>
    <section class="px-16">
        <v-select v-model="select" :items="itemSelect" color="C4C4C4" item-text="name" dense solo label="Products" class='select'></v-select>
        <product-management v-show="select === 'Products' || select === ''" />
        <seller-management v-show="select === 'Sellers'" />
        <category-management v-show="select === 'Categories'" />
        <supplier-management v-show="select === 'Suppliers'" />
    </section>
</template>

<script>
import seller_management from '../components/seller_management.vue';
import product_management from '../components/product_management.vue';
import category_management from '../components/category_management.vue';
import supplier_management from '../components/supplier_management.vue';
export default {
    name: 'ManagementPage',
    layout: "default",
    components: {
        'seller-management': seller_management,
        'product-management': product_management,
        'category-management': category_management,
        'supplier-management': supplier_management
    },
    data() {
        return {
            select: "",
            itemSelect: ["Products", "Sellers", "Categories", "Suppliers"],
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