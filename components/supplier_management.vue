<template>
<div>
    <div class="supplier-management mb-2 text-h4" align="center">
        <h1>Suppliers Management</h1>
    </div>
    <div class="text-center">
        <v-dialog v-model="dialog" width="350">
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
                        Create Supplier
                    </h2>
                </div>
                <v-card-text>
                    <v-form>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="12" class="brand">
                                    <v-text-field v-model="brand" label="Brand" dense small outlined clearable></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" class="country">
                                    <v-text-field v-model="country" label="Country" dense small outlined clearable></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" class="file">
                                    <label for="file-input">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV9ef4mu_ntPiqBjBlsGQNRNDLBKNILEnBoBP1rJlD_0P3cQ_f3DbGdeR-i5PAffS7oo8&usqp=CAU" width="40px" height="40px"/>
                                    </label>
                                    <input type="file" @change="selectLogo" show-size counter multiple label="File input" id="file-input" class="file-input"/>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="create">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
    <div class="category-table">
        <v-data-table :headers="headers" :items="brands" class="table elevation-7">
            <template v-slot:body="{ items }">
                <tbody>
                    <tr v-for="brand in items" :key="brand.id">
                        <td><img :src="'http://localhost:5000/api/product-details/image/'+brand.logo" alt="" width="50px" height="50px"></td>
                        <td>{{ brand.brand }}</td>
                        <td>{{ brand.country }}</td>
                        <td>
                            <v-icon small color="red" class="delete mr-2" @click="deleteItem">
                                mdi-delete
                            </v-icon>
                            <v-icon small color="#00E676" class="edit">
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
                                Remove this supplier
                            </h2>
                        </div>
                        <div align="center" class="mt-3 mb-3">
                            <p>Are you sure you want to remove this supplier ?</p>
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
import {mapActions,mapGetters,mapState} from 'vuex';
export default {
    data() {
        return {
            dialog: false,
            dialogDelete: false,
            brand: '',
            country: '',
            logo:'',
            headers: [{
                    text: 'Logo',
                    value: 'logo',
                },
                {
                    text: 'Brand',
                    value: 'brand'
                },
                {
                    text: 'Country',
                    value: 'country',
                },
                {
                    text: 'Action',
                    value: 'action'
                }
            ],
        }
    },
    computed:{
        ...mapState(['brands'])
    },
    methods: {
        ...mapActions(['getAllBrands','createBrand']),
        closeDelete() {
            this.dialogDelete = false;
        },
        deleteItemConfirm() {
            this.closeDelete();
        },
        deleteItem() {
            this.dialogDelete = true;
        },
        selectLogo(event){
            this.logo = event.target.files[0]
        },
        getSupplier(){
            this.$axios.$get('/product-suppliers').then(res=>{
                this.suppliers = res.data;
            }).catch(error=>{
                console.log(error)
            });
        },
        create(){
            const supplier = new FormData();
            supplier.append('brand',this.brand);
            supplier.append('country',this.country);
            supplier.append('logo',this.logo);
            this.createBrand(supplier);
                this.dialog = false;
                this.brand = '';
                this.country = '';
                this.logo = '';
                console.log(res)
          
        }
    },
    mounted() {
        this.getAllBrands();
    }
}
</script>

<style scoped>
.supplier-management {
    text-shadow: 0px 2px 4px #3B3B3B;
}

.table {
    margin-top: 80px;
}

.brand {
    margin-top: 15px;
}

.country {
    margin-top: -25px;
    margin-bottom: -25px;
}

.delete:hover,
.edit:hover {
    cursor: pointer;
}

.file {
    margin-bottom: -25px;
}

.file-input {
    display: none;
}
</style>
