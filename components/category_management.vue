<template>
<div>
    <div class="seller-management mb-2 text-h4" align="center">
        <h1>Categories Management</h1>
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
        <v-dialog persistent v-model="dialog" width="350">
            <v-card>
                <div align="center" class="grey lighten-3 pa-3">
                    <h2>
                        Create Category
                    </h2>
                </div>
                <v-card-text>
                    <v-form>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="12" class="name">
                                    <v-text-field v-model="name" label="Name" dense small outlined clearable></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
                <v-card-actions class="action">
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="closeDialog">Cancel</v-btn>
                    <v-btn color="primary" v-show="addBtn" text @click="create">Add</v-btn>
                    <v-btn color="primary" v-show="updateBtn" text @click="update">Update</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
    <div class="category-table">
        <v-data-table :headers="headers" :items="categories" class="table elevation-7">
            <template v-slot:body="{ items }">
                <tbody>
                    <tr v-for="category in items" :key="category.id">
                        <td>{{ category.name }}</td>
                        <td>
                            <v-icon small color="red" class="delete mr-2" @click="deleted(category.id)">
                                mdi-delete
                            </v-icon>
                            <v-icon small color="#00E676" class="edit" @click="openFormUpdate(category)">
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
                                Remove this category
                            </h2>
                        </div>
                        <div align="center" class="mt-3 mb-3">
                            <p>Are you sure you want to remove this category ?</p>
                        </div>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" text @click="closeDialog">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteCategoryConfirm">Yes</v-btn>
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
import {mapActions,mapGetters, mapState} from 'vuex';
export default {
    data() {
        return {
            dialog: false,
            dialogDelete: false,
            name: '',
            categoryId:null,
            addBtn:true,
            updateBtn:false,
            categoryId : null,
            headers: [
                {
                    text: 'Name',
                    value: 'name'
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
        ...mapState(['categories']),
    },
    methods: {
        ...mapActions(['createCategory','getAllCategories','deleteCategory','updateCategory']),
        closeDialog() {
            this.addBtn = true;
            this.updateBtn = false;
            this.dialogDelete = false;
            this.dialog = false;
            this.categoryId = null;
            this.name = null;
        },
        async deleteCategoryConfirm() {
            await this.deleteCategory(this.categoryId);
            this.getAllCategories();
            this.closeDialog();
        },
        deleted(categoryId) {
            this.dialogDelete = true;
            this.categoryId = categoryId
        },

        openFormCreate(){
            this.dialog = true;
        },
        openFormUpdate(category){
            this.addBtn = false;
            this.updateBtn = true;
            this.categoryId = category.id;
            this.name = category.name;
            this.dialog = true;
        },
        async update(){
            const category = {name:this.name}
            const categoryData = {
                id:this.categoryId,
                category:category
            }
            await this.updateCategory(categoryData);
            this.getAllCategories();
            this.closeDialog();
        },
        async create(){
            const category = {name:this.name}
            await this.createCategory(category);
            this.getAllCategories();
            this.closeDialog();
        }
    },
    mounted() {
        this.getAllCategories();
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

.name {
    margin-top: 10px;
}

.action {
    margin-top: -45px;
}

.category-table {
    width: 500px;
    margin: auto;
}

.delete:hover, .edit:hover {
    cursor: pointer;
}
</style>
