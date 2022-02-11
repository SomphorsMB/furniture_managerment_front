<template>
<v-container>
    <v-row>
        <v-col cols="6" xl="6" lg="6" md="6" sm="12" xs="12" class="pa-0">
            <v-img class="white--text d-flex justify-center align-center" elevation="2" height="80vh" src="https://images.squarespace-cdn.com/content/v1/5a85f1ae010027c3e21cfb7e/1598488914272-U54L2WW06JI3SLNFPTMN/OS_room4_rev2+%281%29.jpg">
                <v-card class="
              cards
              mx-16
              rounded-xl
              text-center
              align-center
              py-6
              rounded-0

            " >
                    <v-card-text class="#212121--text text-h4 py-0">Elegant</v-card-text>
                    <v-card-text class="black--text text-h3 py-0 font-weight-black">Furniture</v-card-text>
                    <v-card-text class="#212121--text text-h4 py-0">Modern</v-card-text>
                    <v-card-text class="black--text text-h6 px-2 pb-0">Login to the
                        <strong class="font-weight-black">manage</strong> the product and
                        deliver modern furniture to the
                    </v-card-text>
                    <v-card-text class="black--text text-h5 py-0 font-weight-black">World Wide Customers</v-card-text>
                </v-card>
            </v-img>
        </v-col>
        <v-col cols="6" xl="6" lg="6" md="6" sm="12" xs="12" class="pa-0">
            <v-card flat height="80vh" class="right-card d-flex align-center rounded-0">
                <v-form class="justify-center px-12">
                    <v-row>
                        <h1 class="mx-auto grey--text text-h3 mb-10 font-weight-black">
                            Login
                        </h1>

                        <v-col cols="12" sm="12" md="12" class="py-0">
                            <v-text-field v-model="email" label="Email" placeholder="example@gmail.com" append-icon="mdi-email" :rules="emailRule" outlined dense></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12" class="py-0">
                            <v-text-field v-model="password" label="Password" :type="show1 ? 'text' : 'password'" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRule" @click:append="show1 = !show1" outlined dense></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12" class="py-0 mb-3" align="center" style="margin-top: -20px">
                            <small class="red--text"><strong>{{ loginErr }}</strong></small>
                        </v-col>
                        <v-btn @click="userLogin" class="mx-auto font-weight-black white--text grey" width="40%">Login</v-btn>
                        <!-- <v-btn @click="getSeller" class="mx-auto font-weight-black white--text grey" width="40%">getSeller</v-btn> -->
                    </v-row>
                </v-form>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    layout: "login",
    data() {
        return {
            email: "",
            password: "",
            show1: false,
            emailRule: [],
            passwordRule: [],
            access_token: ''
        };
    },
    computed:
        mapState(['loginErr']),
    methods:{
        ...mapActions(['login','getSellers','isLogin']),
        async userLogin() {
            const user = {
                email:this.email,
                password:this.password
            }
            this.login(user);
        },

    },
    watch: {
        password() {
            this.passwordRule = [
                (value) => !!value || "Password is required.",
                (value) =>
                value.length >= 8 || "Password should have at least 8 character",
            ];
        },
        email() {
            this.emailRule = [
                (value) => !!value || "Email is required.",
                (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "E-mail must be valid",
            ];
        },
    },
};
</script>

<style scoped>
.right-card {
    border: 0.2px solid rgba(128, 128, 128, 0.524);
}

.cards {
    background: rgba(202, 201, 201, 0.469);
}
</style>