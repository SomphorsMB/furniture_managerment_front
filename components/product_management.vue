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
                        <v-icon dark> mdi-plus </v-icon>
                    </v-btn>
                </div>
            </template>
            <v-card>
                <div align="center" class="grey lighten-3 pa-3">
                    <h2>Create a Product</h2>
                </div>
                <v-card-text>
                    <v-form>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" class="name">
                                    <v-text-field v-model="name" label="Name" dense small outlined clearable></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" class="category">
                                    <v-select :items="categories" item-text="name" v-model="category" label="Category" return-object filled dense small outlined clearable></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" class="brand">
                                    <v-select :items="brands" item-text="brand" v-model="brand" label="Brand" return-object dense small outlined clearable></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" class="size">
                                    <v-select :items="sizes" v-model="size" label="Size" dense small outlined clearable></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" class="unit">
                                    <v-text-field v-model="unit" label="Unit" dense small outlined clearable></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" class="color">
                                    <v-select :items="colors" label="Color" v-model="color" dense small outlined clearable></v-select>
                                </v-col>
                                <v-col cols="12" class="text-area">
                                    <v-textarea outlined name="input-7-4" v-model="rawMaterial" label="Raw Materials" value=""></v-textarea>
                                </v-col>
                                <v-col cols="12" sm="10" class="price">
                                    <v-text-field v-model="price" label="Price: XXX$" dense small outlined clearable></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="2" class="file">
                                    <label for="file-input">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV9ef4mu_ntPiqBjBlsGQNRNDLBKNILEnBoBP1rJlD_0P3cQ_f3DbGdeR-i5PAffS7oo8&usqp=CAU" width="40px" height="40px" />
                                    </label>
                                    <input type="file" show-size counter multiple label="File input" id="file-input" class="file-input" @change="selectImage"/>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
                <v-divider class="devider"></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="create" class="save">
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
                        <td>
                            <img width="40px" height="40px" :src="'http://localhost:5000/api/product-details/image/'+ product.productDetail_avatar" />
                        </td>
                        <td>{{ product.product_name }}</td>
                        <td>{{ product.supplier_brand}}</td>
                        <td>{{ product.supplier_country }}</td>
                        <td>{{ product.productDetail_unit }}</td>
                        <td>{{ product.productDetail_price }}$</td>

                        <td v-if="product.discount_discount == null">0%</td>
                        <td v-else>{{product.discount_discount}}%</td>
                        <td>
                            <v-icon small color="red" class="delete mr-1" @click="deleteItem(product.product_id)">
                                mdi-delete
                            </v-icon>
                            <v-icon small color="#00E676" class="edit mr-1">
                                mdi-pencil
                            </v-icon>
                            <v-icon small color="#00E676" class="edit" @click="addAmount(product)">
                                mdi-plus
                            </v-icon>
                            <v-icon small color="#00E676" class="edit" @click="discountItem(product.productDetail_id)">
                                mdi-percent
                            </v-icon>
                        </td>
                    </tr>
                </tbody>
                <!--  -->
                <v-dialog v-model="dialogDelete" max-width="350px">
                    <v-card>
                        <div align="center" class="grey lighten-3 pa-3">
                            <h2>Delete this product</h2>
                        </div>
                        <div align="center" class="mt-3 mb-3">
                            <p>Are you sure you want to delete this item?</p>
                        </div>
                        <v-card-actions>
                            <v-btn color="red darken-1" text @click="closeDialog">Cancel</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">Yes</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <!--  -->
                <v-dialog v-model="dialogAdd" max-width="350px">
                    <v-card>
                        <div align="center" class="grey lighten-3 pa-3">
                            <h2>Increase Product</h2>
                        </div>
                        <div align="center">
                            <v-col cols="12" class="mt-6">
                                <v-text-field v-model="amount" label="Amount" dense small outlined clearable></v-text-field>
                            </v-col>
                        </div>
                        <v-card-actions>
                            <v-btn color="red darken-1" text @click="closeDialog">Cancel</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="addAmountConfirm">Add</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <!--  -->
                <v-dialog v-model="dialogDiscount" max-width="350px">
                    <v-card>
                        <div align="center" class="grey lighten-3 pa-3">
                            <h2>Discount Product</h2>
                        </div>
                        <div align="center">
                            <v-col cols="12" class="mt-6">
                                <v-text-field v-model="discount" label="Discount %" dense small outlined clearable></v-text-field>
                            </v-col>
                            <v-col cols="12" class="start_date">
                                <v-menu v-model="start_date" :close-on-content-click="false" max-width="290">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field :value="computedDateFormattedMomentjs" dense small outlined clearable label="Start Date" v-bind="attrs" v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="start_at" @change="start_date = false"></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="12" class="end_date">
                                <v-menu v-model="end_date" :close-on-content-click="false" max-width="290">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field :value="computedDateFormattedMomentjs" dense small outlined clearable label="End Date" v-bind="attrs" v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="end_at" @change="end_date = false"></v-date-picker>
                                </v-menu>
                            </v-col>
                        </div>
                        <v-card-actions>
                            <v-btn color="red darken-1" text @click="closeDialog">Cancel</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="discountItemConfirm">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </template>
        </v-data-table>
    </div>
</div>
</template>

<script>
import axios from "axios";
import moment from 'moment'
import { mapActions, mapGetters, mapState } from 'vuex';
import { format, parseISO } from 'date-fns'
export default {
    data() {
        return {
            dialog: false,
            dialogDelete: false,
            dialogAdd: false,
            dialogDiscount: false,
            name: "",
            brand:null,
            size:"",
            category:null,
            color:"",
            unit:0,
            rawMaterial:"",
            price:0,
            avatar:"",
            discount: "0%",
            amount: 0,
            date: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
            start_date: false,
            end_date: false,
            start_at:null,
            end_at:null,
            // categories: [],
            // brands: [],
            sizes: ["Small", "Medium", "Large"],
            colors: [
                "Red",
                "Blue",
                "Grey",
                "Pink",
                "Yellow",
                "Cyan",
                "Margenta",
                "Brown",
                "Silver",
                "Gold",
                "Green",
                "White",
                "Black",
                "Orange",
                "Purple",
            ],
            headers: [{
                    text: "Furniture",
                    value: "furniture",
                    sortable: false,
                },
                {
                    text: "Name",
                    value: "name",
                },
                {
                    text: "Brand",
                    value: "brand",
                },
                {
                    text: "Country",
                    value: "country",
                },
                {
                    text: "Unit",
                    value: "unit",
                },
                {
                    text: "Price",
                    value: "price",
                },
                {
                    text: "Discount",
                    value: "discount",
                },
                {
                    text: "Action",
                    value: "action",
                    sortable: false,
                },
            ],
            // products: [],
            productId:null,
            productDetail:{},
        };
    },
    computed: {

        computedDateFormattedMomentjs () {
            return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
        },
        ...mapState(['products','categories','brands']),

    },
    methods: {
        ...mapActions(['createProduct','createDiscount','getAllProduct','getAllCategories','getAllBrands','deleteProduct']),

        closeDialog() {
            this.dialogDelete = false;
            this.dialogAdd = false;
            this.dialogDiscount = false;
            this.productId = null;
        },
        deleteItemConfirm() {
            this.deleteProduct(this.productId);
            this.closeDialog();

        },

        deleteItem(productId) {
            this.dialogDelete = true;
            this.productId = productId;
        },

        addAmountConfirm() {

            this.closeDialog();
        },

        addAmount(productDetail) {
            
            // this.productDetail.avatar = productDetail.productDetail_avatar;
            // this.productDetail.avatar = productDetail.productDetail_unit;
            // this.productDetail.avatar = productDetail.productDetail_price;
            // this.productDetail.avatar = productDetail.productDetail_color;
            // this.productDetail.avatar = productDetail.productDetail_rawMaterial;
            // this.productDetail.avatar = productDetail.productDetail_size;
            // this.productDetail.product = productDetail.productDetail_productId;
            // this.productDetail.avatar = productDetail.productDetail_supplierId;

            this.dialogAdd = true;
        },

        discountItemConfirm() {
            const discount = {
                product:this.id,
                discount:parseInt(this.discount),
                start_at:this.start_at,
                end_at:this.end_at
            }
            this.createDiscount(discount)
            this.closeDialog();
        },

        discountItem(productDetailId) {
            this.id = productDetailId;
            this.dialogDiscount = true;
        },

        selectImage(event){
            this.avatar = event.target.files[0]
        },
        create(){
            const product = {
                name:this.name,
                category:this.category.id,
            }
            const productDetail =  new FormData();
            productDetail.append("supplier",this.brand.id);
            productDetail.append("color",this.color);
            productDetail.append("size",this.size);
            productDetail.append("price",parseInt(this.price));
            productDetail.append("unit",parseInt(this.unit));
            productDetail.append("rawMaterial",this.rawMaterial);
            productDetail.append("avatar",this.avatar);
            const productData = {
                product: product,
                productDetail: productDetail
            }
            this.createProduct(productData);
            this.dialog = false;
            this.name = '';
            this.brand = null;
            this.rawMaterial = '';
            this.price = 0;
            this.avatar = '';
            this.unit = '';
            this.size = '';
            this.color = '';
            this.category =  null;    
        },
    },
    mounted() {
        this.getAllCategories();
        this.getAllBrands();
        this.getAllProduct();

    },
};
</script>

<style scoped>
.seller-management {
    text-shadow: 0px 2px 4px #3b3b3b;
}

.delete:hover,
.edit:hover {
    cursor: pointer;
}

.table {
    margin-top: 100px;
}

.name,
.category {
    margin-top: 15px;
}

.brand,
.size,
.unit,
.color,
.price,
.file,
.text-area {
    margin-top: -30px;
}

.file-input {
    display: none;
}

.save {
    margin-top: -40px;
}

.start_date, .end_date {
    margin-top: -30px;
}
</style>
