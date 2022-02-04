<template>
<v-card class="mt-4 mx-1 rounded-0">
    <v-card-text class="cardNew py-1 black white--text rounded-0">New</v-card-text>
    <v-card-text class="cardDiscount py-1 grey darken-1 white--text" v-if="status=='Product Discount'">-20%</v-card-text>
    <v-hover v-slot="{ hover }" >
        <v-img src="https://www.fabindia.com/ccstore/v1/images/?source=/file/v6387149487885218198/products/10628633SF.f.211219.jpg&height=475&width=475" height="320px" >
            <v-overlay
                v-if="hover"
                absolute
                color="rgba(79, 79, 79, 0.53)"
                @click.stop="dialog = true"
            > 
                <v-icon class="font-weight-black" @click.stop="dialog = true">mdi-eye</v-icon>
            </v-overlay>

        </v-img>

    </v-hover>

    <v-card-title> Furniture Name </v-card-title>
    <v-card-subtitle class="pb-0 green--text"> In Stock </v-card-subtitle>

    <v-card-actions>
        <h4 class="pl-2 orange--text">123$</h4>
        <h4 class=" pl-1 text-decoration-line-through orange--text" v-if="status=='Product Discount'">123$</h4>

        <v-spacer></v-spacer>

        <div class="minusplusnumber">
            <div class="mpbtn minus text-h6 px-3" v-on:click="minus()">-</div>
            <div id="field_container">
                <input type="text" v-model="newValue" class="text-center" />
            </div>
            <div class="mpbtn plus text-h6" v-on:click="plus()">+</div>
        </div>
        <v-btn>
            <v-icon>mdi-cart</v-icon>
        </v-btn>
    </v-card-actions>

    <product-detail v-if="dialog" @close="dialog = false"/>

</v-card>
</template>

<script>
export default {
    props: ['status'],
    data() {
        return {
            min: 1,
            max: 100,
            newValue: 1,
            dialog: false
        };
    },
    methods: {
        plus: function () {
            if (this.max === undefined || this.newValue < this.max) {
                this.newValue = this.newValue + 1;
                // this.$emit('input', this.newValue)
            }
        },
        minus: function () {
            if (this.newValue > this.min) {
                this.newValue = this.newValue - 1;
                // this.$emit('input', this.newValue)
            }
        },
    },
};
</script>

<style scoped>
.minusplusnumber {
    border: 1px solid silver;
    border-radius: 5px;
    background-color: #fff;
    /* background-color: rgba(79, 79, 79, 0.53); */
    margin: 0 5px 0 5px;
    display: inline-block;
    user-select: none;
}

.minusplusnumber div {
    display: inline-block;
}

.minusplusnumber #field_container input {
    width: 30px;
    text-align: center;
    font-size: 15px;
    padding: 3px;
    border: none;
}

.minusplusnumber .mpbtn {
    padding: 3px 10px 3px 10px;
    cursor: pointer;
    border-radius: 5px;
}

.minusplusnumber .mpbtn:hover {
    background-color: #ddd;
}

.minusplusnumber .mpbtn:active {
    background-color: #c5c5c5;
}

.cardNew,
.cardDiscount {
    text-align: center;
    position: absolute;
    z-index: 2;
    width: 24%;
}

.cardNew {
    top: 10px;
    left: 0;
}

.cardDiscount {
    top: 50px;
    left: 0;
}
</style>
