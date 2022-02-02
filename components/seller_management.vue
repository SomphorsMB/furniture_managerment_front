<template>
<div>
    <div class="seller-management mb-2 text-h4" align="center">
        <h1>Sellers Management</h1>
    </div>
    <div class="add-btn float-right">
        <v-btn class="mx-2" fab color="C4C4C4">
            <v-icon dark>
                mdi-plus
            </v-icon>
        </v-btn>
    </div>
    <div>
        <v-data-table :headers="headers" :items="sellers" class="table elevation-7">
            <template v-slot:body="{ items }">
                <tbody>
                    <tr v-for="seller in items" :key="seller.id">
                        <td>{{ seller.firstName }}</td>
                        <td>{{ seller.lastName }}</td>
                        <td>{{ seller.gender }}</td>
                        <td>{{ seller.phone }}</td>
                        <td>{{ seller.address }}</td>
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
            headers: [{
                    text: 'First Name',
                    value: 'firstName'
                },
                {
                    text: 'Last Name',
                    value: 'lastName'
                },
                {
                    text: 'Gender',
                    value: 'gender'
                },
                {
                    text: 'Tel',
                    value: 'tel'
                },
                {
                    text: 'Address',
                    value: 'address'
                },
                {
                    text: 'Actions',
                    value: 'actions',
                    sortable: false
                },
            ],
            sellers: [{
                    id: 1,
                    firstName: 'Thida',
                    lastName: 'Tep',
                    gender: 'F',
                    phone: '081 328 389',
                    address: 'Phnom Penh'
                },
                {
                    id: 2,
                    firstName: 'Seyha',
                    lastName: 'Phai',
                    gender: 'M',
                    phone: '081 328 389',
                    address: 'Battambang'
                },
                {
                    id: 3,
                    firstName: 'Pheaktra',
                    lastName: 'Sy',
                    gender: 'F',
                    phone: '081 328 389',
                    address: 'Phnom Penh'
                },
                {
                    id: 4,
                    firstName: 'Borith',
                    lastName: 'Thai',
                    gender: 'M',
                    phone: '081 328 389',
                    address: 'Phnom Penh'
                },
                {
                    id: 5,
                    firstName: 'Panha',
                    lastName: 'Chay',
                    gender: 'M',
                    phone: '081 328 389',
                    address: 'Phnom Penh'
                }
            ]
        }
    },
    methods: {
        // getSeller() {
        //     axios.get('http://localhost:5000/api/sellers')
        //         .then((res) => {
        //             this.sellers = res.data;
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         })
        // }
    },
    mounted() {
        // this.getSeller();
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
