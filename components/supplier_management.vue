<template>
<div>
    <div class="seller-management mb-2 text-h4" align="center">
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
                                    <input type="file" show-size counter multiple label="File input" id="file-input" class="file-input"/>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
    <div class="category-table">
        <v-data-table :headers="headers" :items="suppliers" class="table elevation-7">
            <template v-slot:body="{ items }">
                <tbody>
                    <tr v-for="supplier in items" :key="supplier.id">
                        <td><img :src="supplier.logo" alt="" width="50px" height="50px"></td>
                        <td>{{ supplier.brand }}</td>
                        <td>{{ supplier.country }}</td>
                        <td>
                            <v-icon small color="red" class="delete mr-2">
                                mdi-delete
                            </v-icon>
                            <v-icon small color="#00E676" class="edit">
                                mdi-pencil
                            </v-icon>
                        </td>
                    </tr>
                </tbody>
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
            deleteDialog: false,
            brand: '',
            country: '',
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
            suppliers: [{
                    brand: 'PAINCA',
                    country: 'SPAIN',
                    logo: 'https://coollogo.net/wp-content/uploads/2021/02/CATTELAN-ITALIA-logo.svg'
                },
                {
                    brand: 'CATTELAN',
                    country: 'ITALY',
                    logo: 'https://coollogo.net/wp-content/uploads/2021/02/CATTELAN-ITALIA-logo.svg'
                },
                {
                    brand: 'DESIREE',
                    country: 'ITALY',
                    logo: 'https://coollogo.net/wp-content/uploads/2021/02/CATTELAN-ITALIA-logo.svg'
                },
                {
                    brand: 'BENALDO',
                    country: 'FRANCE',
                    logo: 'https://coollogo.net/wp-content/uploads/2021/02/CATTELAN-ITALIA-logo.svg'
                },
                {
                    brand: 'PEDRO',
                    country: 'ENGLAND',
                    logo: 'https://coollogo.net/wp-content/uploads/2021/02/CATTELAN-ITALIA-logo.svg'
                },
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
