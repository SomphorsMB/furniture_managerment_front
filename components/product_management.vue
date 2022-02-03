<template>
<div>
    <div class="seller-management mb-2 text-h4" align="center">
        <h1>Products Management</h1>
    </div>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
                <div class="float-right">
                    <v-btn class="mx-2" fab color="C4C4C4" v-bind="attrs" v-on="on">
                        <v-icon dark>
                            mdi-plus
                        </v-icon>
                    </v-btn>
                </div>
            </template>
            <v-card>
                <div align="center" class="grey lighten-3 pa-3">
                    <h2>
                        Create a Product
                    </h2>
                </div>
                <v-card-text>
                    <v-form>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" class="name">
                                    <v-text-field v-model="name" label="Name" dense small outlined clearable></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" class="category">
                                    <v-select :items="categories" label="Category" dense small outlined clearable></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" class="brand">
                                    <v-select :items="brands" label="Brand" dense small outlined clearable></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" class="size">
                                    <v-select :items="sizes" label="Size" dense small outlined clearable></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" class="unit">
                                    <v-text-field v-model="unit" label="Unit" dense small outlined clearable></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" class="color">
                                    <v-select :items="colors" label="Color" dense small outlined clearable></v-select>
                                </v-col>
                                <v-col cols="12" class="text-area">
                                    <v-textarea outlined name="input-7-4" label="Raw Materials" value=""></v-textarea>
                                </v-col>
                                <v-col cols="12" sm="10" class="price">
                                    <v-text-field v-model="price" label="Price: XXX$" dense small outlined clearable></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="2" class="file">
                                    <label for="file-input">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV9ef4mu_ntPiqBjBlsGQNRNDLBKNILEnBoBP1rJlD_0P3cQ_f3DbGdeR-i5PAffS7oo8&usqp=CAU" width="40px" height="40px"/>
                                    </label>
                                    <input type="file" show-size counter multiple label="File input" id="file-input" class="file-input"/>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
                <v-devider class="devider"></v-devider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false" class="save">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
                            <v-icon small color="red" class="delete mr-1" @click="deleteItem">
                                mdi-delete
                            </v-icon>
                            <v-icon small color="#00E676" class="edit mr-1">
                                mdi-pencil
                            </v-icon>
                        </td>
                    </tr>
                </tbody>
                <!--  -->
                <v-dialog v-model="dialogDelete" max-width="350px">
                    <v-card>
                        <div align="center" class="grey lighten-3 pa-3">
                            <h2>
                                Delete this product
                            </h2>
                        </div>
                        <div align="center" class="mt-3 mb-3">
                            <p>Are you sure you want to delete this item?</p>
                        </div>
                        <v-card-actions>
                            <v-btn color="red darken-1" text @click="closeDelete">Discard</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">Okay</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <!--  -->
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
            dialog: false,
            dialogDelete: false,
            name: '',
            categories: ['Table', 'Chair', 'Sofa', 'Bed', 'Dinning table', 'Lamp'],
            brands: ['PAINCA', 'DESIREE', 'BONALDO', 'CATTELAN', 'PEDRO'],
            sizes: ['Small', 'Medium', 'Large'],
            colors: ['Red', 'Blue', 'Grey', 'Pink', 'Yellow', 'Cyan', 'Margenta', 'Brown', 'Silver', 'Gold', 'Green', 'White', 'Black', 'Orange', 'Purple'],
            unit: 0,
            price: '',
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
                    text: 'Discount',
                    value: 'discount',
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
        closeDelete() {
            this.dialogDelete = false;
        },
        deleteItemConfirm() {
            this.closeDelete();
        },
        deleteItem() {
            this.dialogDelete = true;
        },
    },
    mounted() {

    }
}
</script>

<style scoped>
.seller-management {
    text-shadow: 0px 2px 4px #3B3B3B;
}

.delete:hover, .edit:hover {
    cursor: pointer;
}

.table {
    margin-top: 100px;
}

.name, .category {
    margin-top: 15px;
}

.brand, .size, .unit, .color, .price, .file, .text-area {
    margin-top: -30px;
}

.file-input {
    display: none;
}

.save {
    margin-top: -40px;
}
</style>
