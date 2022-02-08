<template>
<v-app light>
    <v-navigation-drawer class="grey lighten-1" v-model="drawer" :clipped="clipped" temporary fixed app>
        <v-list>
                <v-list-item-title class="text-center ">
                    <h2 class="accent--text font-weight-medium text-shadow">Elegant</h2>
                    <h4 class="display-1 font-weight-medium text-shadow">FURNITURE</h4>
                    <h2 class="accent--text font-weight-medium text-shadow  mb-2">Modern</h2>
                </v-list-item-title>
        </v-list>
        <hr>
        <v-list>
            <v-list-item v-for="(sellerMenu, index) in sellerNav" :key="index" :to="sellerMenu.to" router exact>
                <v-list-item-action>
                    <v-icon>{{ sellerMenu.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title v-text="sellerMenu.title" />
                </v-list-item-content>
            </v-list-item>
            <hr>
            <v-list-item v-for="(managerMenu, index) in managerNav" :key="index" :to="managerMenu.to" router exact>
                <v-list-item-action>
                    <v-icon>{{ managerMenu.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title v-text="managerMenu.title" />
                </v-list-item-content>
            </v-list-item>
            <v-list-item to='/login' router exact>
                <v-list-item-action>
                    <v-icon>mdi-logout</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Log out</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

    </v-navigation-drawer>
    <v-app-bar class="grey lighten-1" fixed app>
        <v-icon size="36px" @click.stop="drawer = !drawer" class="ml-lg-12 ml-sm-6">mdi-menu</v-icon>
        <v-spacer />
        <input class="input-search" type="text" placeholder="Search for furniture...">
        <v-btn icon class="mr-lg-6">
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-badge class="mr-lg-12 mr-sm-6 mt-3" bordered color="error" :icon="productInCart.length" overlap>
            <v-btn icon>
                <v-icon class="mb-3" size="36px" @click="dialogCart = true">mdi-cart-outline</v-icon>
            </v-btn>
        </v-badge>
    </v-app-bar>
    <v-main color="red">
        <Nuxt />
    </v-main>

    <product-cart v-if="dialogCart" @close="dialogCart = false" />
</v-app>
</template>

<script>
import { mapGetters } from "vuex"
export default {
    // layout: "default",
    name: 'DefaultLayout',
    data() {
        return {
            dialogCart: false,
            clipped: false,
            drawer: false,
            fixed: false,
            sellerNav: [{
                    icon: 'mdi-home',
                    title: 'Home',
                    to: '/home'
                },
                {
                    icon: 'mdi-desk-lamp',
                    title: 'Furniture',
                    to: '/furniture'
                },
                {
                    icon: 'mdi-brightness-percent',
                    title: 'Discount',
                    to: '/discount'
                }
            ],
            managerNav: [{
                    icon: 'mdi-account-cog',
                    title: 'Management',
                    to: '/management'
                },
                {
                    icon: 'mdi-finance',
                    title: 'Statistic',
                    to: '/statistic'
                }
            ],
            miniVariant: false,
            number: "28"
        }
    },
    computed:{
        ...mapGetters(['productInCart']),
    },
    // methods:{
    //     ...mapGetters(['productInCart']),
    // },
    
}
</script>

<style scoped>
.input-search {
    background: white;
    outline: none;
    height: 70%;
    width: 30%;
    padding: 5px;
    border-radius: 5px;
}

.input-search::placeholder {
    text-align: center;
}

.text-shadow {
    text-shadow: 0px 10px 6px #464545ef;
}
</style>
