<template>
<div>
    <div class="seller-management mb-2 text-h4" align="center">
        <h1>Sellers Management</h1>
    </div>
    <div class="text-center">
        <template>
            <div class="float-right">
                <v-btn class="mx-2" fab color="C4C4C4" @click="openFormCreate">
                    <v-icon dark>
                        mdi-plus
                    </v-icon>
                </v-btn>
            </div>
        </template>
        <v-dialog persistent v-model="dialog" width="500">
            <v-card>
                <div align="center" class="grey lighten-3 pa-3">
                    <h2>
                        Create a Seller
                    </h2>
                </div>

                <v-card-text>
                    <v-form>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" class="name">
                                    <v-text-field v-model="firstName" label="First Name" dense small outlined clearable></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" class="name">
                                    <v-text-field v-model="lastName" label="Last Name" dense small outlined clearable></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" class="tel">
                                    <v-text-field v-model="tel" label="Tel" dense small outlined clearable></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" class="address">
                                    <v-text-field v-model="address" label="Address" dense small outlined clearable></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" class="gender">
                                    <v-radio-group v-model="gender" row>
                                        <v-radio label="Male" value="M"></v-radio>
                                        <v-radio label="Female" value="F"></v-radio>
                                    </v-radio-group>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="closeDialog">Cancel</v-btn>
                    <v-btn color="primary" v-show="addBtn" text @click="create">Add</v-btn>
                    <v-btn color="primary" v-show="updateBtn" text @click="update">Update</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
                            <v-icon small color="red" class="delete mr-2" @click="deleted(seller.id)">
                                mdi-delete
                            </v-icon>
                            <v-icon small color="#00E676" class="edit" @click="openFormUpdate(seller)">
                                mdi-pencil
                            </v-icon>
                        </td>
                    </tr>
                </tbody>
                <!--  -->
                <v-dialog persistent v-model="dialogDelete" max-width="350px">
                    <v-card>
                        <div align="center" class="grey lighten-3 pa-3">
                            <h2>
                                Remove this seller
                            </h2>
                        </div>
                        <div align="center" class="mt-3 mb-3">
                            <p>Are you sure you want to remove this seller ?</p>
                        </div>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" text @click="closeDialog">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteSellerConfirm">Yes</v-btn>
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
import { mapActions, mapGetters, mapState} from 'vuex';
export default {
    data() {
        return {
            dialog: false,
            dialogDelete: false,
            genders: ['M', 'F'],
            gender:'',
            firstName: '',
            lastName: '',
            tel: '',
            address: '',
            sellerId:null,
            addBtn:true,
            updateBtn:false,
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
        }
    },
    computed:{
        ...mapState(['sellers'])
    },
    methods: {
        ...mapActions(['createSeller','getAllsellers','deleteSeller','updateSeller',]),
        closeDialog() {
            this.addBtn =  true;
            this.updateBtn = false;
            this.dialogDelete = false;
            this.sellerId = null;
            this.dialog = false;
            this.firstName = '';
            this.lastName = '';
            this.address = '';
            this.tel = '';
            this.gender = '';
        },
        async deleteSellerConfirm() {
            await this.deleteSeller(this.sellerId);
            this.getAllsellers();
            this.closeDialog();
        },
        deleted(sellerId) {
            this.dialogDelete = true;
            this.sellerId = sellerId;
        },

        openFormCreate(){
            this.dialog = true;
        },

        openFormUpdate(seller){  
            this.addBtn = false;
            this.updateBtn = true;
            this.dialog = true;
            this.sellerId = seller.id;
            this.lastName = seller.lastName;
            this.firstName = seller.firstName;
            this.tel = seller.phone;
            this.gender = seller.gender;
            this.address = seller.address;
        },

        async update(){
            const seller = {
                firstName:this.firstName,
                lastName:this.lastName,
                gender:this.gender,
                phone:this.tel,
                address:this.address
            }
            const sellerData = {id:this.sellerId,seller:seller}
            await this.updateSeller(sellerData);
            this.getAllsellers();
            this.closeDialog();
        },
        async create(){
            const seller = {
                firstName:this.firstName,
                lastName:this.lastName,
                gender:this.gender,
                phone:this.tel,
                address:this.address
            }
            await this.createSeller(seller);
            this.getAllsellers();
            this.closeDialog();
        }
    },
    mounted() {
        this.getAllsellers();
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

.name {
    margin-top: 10px;
}

.tel, .address {
    margin-top: -25px;
}

.delete:hover, .edit:hover {
    cursor: pointer;
}

.gender {
    margin-top: -50px;
    margin-bottom: -30px;
}
</style>
