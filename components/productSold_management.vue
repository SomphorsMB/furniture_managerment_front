<template>
<div>
    <div class="seller-management mb-2 text-h4" align="center">
        <h1>Product-Sold Management</h1>
    </div>
    <div class="product-sold-table mt-12">
        <v-data-table :headers="headers" :items="products_sold" class="table elevation-7">
            <template v-slot:body="{ items }">
                <tbody>
                    <tr v-for="product_sold in items" :key="product_sold.id">
                        <td>{{ product_sold.product_name }}</td>
                        <td>{{ product_sold.productDetail_unit }}</td>
                        <td>{{ "Bopha Phoung" }}</td>
                        <td>{{ "30%" }}</td>
                        <td>{{ product_sold.productDetail_price }}</td>
                    </tr>
                </tbody>
            </template>
        </v-data-table>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            products_sold: [],
            headers: [
                {
                    text: "Name",
                    value: "name",
                },
                {
                    text: "Unit",
                    value: "unit",
                },
                {
                    text: "Seller",
                    value: "seller",
                },
                {
                    text: "Discount",
                    value: "discount",
                },
                {
                    text: "Total Income",
                    value: "income",
                },
            ],
        }
    },
    methods: {
        getProductSold() {
            this.$axios.$get('product-solds').then((product_sold) => {
                this.products_sold = product_sold;
                console.log(this.products_sold);
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    mounted() {
        this.getProductSold();
    },
};
</script>

<style scoped>
    .product-sold-table {
        width: 800px;
        margin: auto;
    }

    .seller-management {
        text-shadow: 0px 2px 4px #3b3b3b;
    }
</style>
