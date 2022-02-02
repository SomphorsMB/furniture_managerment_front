<template>
<div>
    <div class="seller-management mb-2 text-h4" align="center">
        <h1>Products Management</h1>
    </div>
    <div class="add-btn float-right">
        <v-btn class="mx-2" fab color="C4C4C4">
            <v-icon dark>
                mdi-plus
            </v-icon>
        </v-btn>
    </div>
    <div>
        <v-data-table :headers="headers" :items="products" class="table elevation-7">
            <template v-slot:body="{ items }">
                <tbody>
                    <tr v-for="product in items" :key="product.id">
                        <td><img width="40px" height="40px" src="https://media.istockphoto.com/photos/modern-designer-chair-on-white-background-texture-chair-picture-id899418544?b=1&k=20&m=899418544&s=170667a&w=0&h=KKBpKvOtEXd2yVmRbQ6zYOnJmQ00Q6E-ks18F8_yrFQ="></td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.brand }}</td>
                        <td>{{ product.country }}</td>
                        <td>{{ product.unit }}</td>
                        <td>{{ product.price }}</td>
                        <td>
                            <v-icon small color="red">
                                mdi-delete
                            </v-icon>
                        </td>
                    </tr>
                </tbody>
                <v-dialog max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">Are you sure you want to delete this seller?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="grey" text>Discard</v-btn>
                            <v-btn color="blue darken-1" text>Okay</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </template>
        </v-data-table>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            headers: [
                {
                    text: 'Furniture',
                    value: 'furniture',
                    sortable: false
                },
                {
                    text: 'Name',
                    value: 'name'
                },
                {
                    text: 'Brand',
                    value: 'brand'
                },
                {
                    text: 'Country',
                    value: 'country'
                },
                {
                    text: 'Unit',
                    value: 'unit'
                },
                {
                    text: 'Price',
                    value: 'price',
                },
                {
                    text: 'Action',
                    value: 'action',
                    sortable: false
                },
            ],
            products: [
                {
                    name: 'Chair',
                    brand: 'Benaldo',
                    country: 'Italy',
                    unit: 2,
                    price: '150$'
                },
                {
                    name: 'Chair',
                    brand: 'Benaldo',
                    country: 'Italy',
                    unit: 2,
                    price: '150$'
                },
                {
                    name: 'Chair',
                    brand: 'Benaldo',
                    country: 'Italy',
                    unit: 2,
                    price: '150$'
                },
                {
                    name: 'Chair',
                    brand: 'Benaldo',
                    country: 'Italy',
                    unit: 2,
                    price: '150$'
                },
                {
                    name: 'Chair',
                    brand: 'Benaldo',
                    country: 'Italy',
                    unit: 2,
                    price: '150$'
                }
            ]
        }
    },
    methods: {

    },
    mounted() {

    }
}
</script>

<style scoped>
.seller-management {
    text-shadow: 0px 2px 4px #3B3B3B;
}

.table {
    margin-top: 100px;
}
</style>
