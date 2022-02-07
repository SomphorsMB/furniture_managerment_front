<template>
<div>
    <div class="seller-management mb-2 text-h4" align="center">
        <h1>Sellers Management</h1>
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
                    <v-btn color="primary" text @click="create">
                        Save
                    </v-btn>
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
                        <td> +855 {{ seller.phone }}</td>
                        <td>{{ seller.address }}</td>
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
                                Remove this seller
                            </h2>
                        </div>
                        <div align="center" class="mt-3 mb-3">
                            <p>Are you sure you want to remove this seller ?</p>
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
        ...mapActions(['createSeller','getAllsellers']),
        closeDelete() {
            this.dialogDelete = false;
        },
        deleteItemConfirm() {
            this.closeDelete();
        },
        deleteItem() {
            this.dialogDelete = true;
        },
        create(){
            const seller = {
                firstName:this.firstName,
                lastName:this.lastName,
                gender:this.gender,
                phone:this.tel,
                address:this.address
            }
            this.createSeller(seller);
                this.dialog = false;
                this.firstName = '';
                this.lastName = '';
                this.address = '';
                this.tel = '';
                this.gender = '';
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
