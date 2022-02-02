<template>
<div>
    <div class="seller-management mb-2 text-h4" align="center">
        <h1>Categories Management</h1>
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
                    <v-btn color="primary" text @click="dialog = false">
                        Save
                    </v-btn>
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
            name: '',
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
            categories: [
                {
                    name: 'Chair'
                },
                {
                    name: 'Bed'
                },
                {
                    name: 'Sofa'
                },
                {
                    name: 'Dinner table'
                },
                {
                    name: 'Armchair'
                },
                {
                    name: 'Bed'
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
