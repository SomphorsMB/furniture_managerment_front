<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="80%" height="80vh">
      <v-card>
        <v-card-title class="pr-0 pt-0 pb-0">
          <v-spacer></v-spacer>
          <v-avatar>
            <v-btn text class="rounded-circle py-4" @click="$emit('close')">
              <v-icon @click="$emit('close')"> mdi-close </v-icon>
            </v-btn>
          </v-avatar>
        </v-card-title>
        <v-card-text>
          <v-container class="pt-0 mt-0">
            <v-row>
              <v-col cols="8" class="">
                <v-row>
                  <v-col cols="7" class="font-weight-bold"> Item </v-col>
                  <v-col cols="3" class="text-center font-weight-bold"> QTY </v-col>
                  <v-col cols="2" class="text-center font-weight-bold"> Price </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-card-subtitle class="mx-auto text-center" v-if="productInCart.length == 0">Cart Emty</v-card-subtitle>
                <v-row class="elevation-1 mt-2" v-for="product in productInCart" :key="product">
                  <v-col cols="7" class="d-flex align-start">
                    <v-col cols="5" class="pa-0">
                      <v-img
                      :src="'http://localhost:5000/api/product-details/image/'+product.product.productDetail_avatar"
                      height="200px"
                    ></v-img>
                    </v-col>
                    <v-card-subtitle class="pt-0 text-h6"
                      >{{product.product.product_name}}</v-card-subtitle
                    >
                  </v-col>
                  <v-col cols="3" class="text-center px-0">
                    <div class="minusplusnumber mt-2">
                      <div
                        class="mpbtn minus text-h6 px-3"
                        v-on:click="minus()"
                      >
                        -
                      </div>
                      <div id="field_container">
                        <input
                          type="text"
                          v-model="product.unit"
                          class="text-center"
                        />
                      </div>
                      <div class="mpbtn plus text-h6" v-on:click="plus(product.product.productDetail_id, product.unit+1)">
                        +
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="2" class="text-center mt-4 px-0">
                    <span class="orange--text" v-if="product.product.discount_discount !== null">${{ product.product.productDetail_price-product.product.productDetail_price*product.product.discount_discount/100 }}</span><br v-if="product.product.discount_discount !== null"/>
                    <span class="orange--text" v-if="product.product.discount_discount == null">${{ product.product.productDetail_price }}</span><br v-if="product.product.discount_discount == null"/>
                    <!-- <span class="orange--text" v-else>$8227.00</span><br /> -->
                    <span class="text-decoration-line-through orange--text" v-if="product.product.discount_discount !== null">$ {{ product.product.productDetail_price }}</span><br v-if="product.product.discount_discount !== null"/>
                    <div class="space"></div>
                    <v-icon class="float-end mr-5">mdi-delete</v-icon>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="4" class="brown lighten-5">
                  <v-card-title class="pa-0 font-weight-bold">Summary</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text class="px-0 d-flex justify-space-between">
                      <v-card-subtitle class="pa-0 font-weight-bold">Total Price:</v-card-subtitle>
                      <v-card-subtitle class="py-0 font-weight-bold orange--text">$ {{ totalPrice }}</v-card-subtitle>
                  </v-card-text>
                  <v-select
                    :items="sellers"
                    label="Seller"
                    dense
                    outlined
                    ></v-select>
                    <v-textarea
                        outlined
                        name="input-1-1"
                        rows="1"
                        row-height="15"
                        label="Description"
                    ></v-textarea>

                    <v-btn width="100%" class="" dark>Check out</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapActions} from "vuex"
export default {
  data: () => ({
    dialog: true,
    min: 1,
    max: 100,
    newValue: 1,
    sellers: ['Somphors NGOUN', 'Pros NOB', 'Bunsal HUL'],
    totalPrice: 0
  }),
  computed:{
    ...mapGetters(['productInCart']),
  },
  methods: {
    ...mapActions(['updateProductInCart']),
    plus: function (id, unit) {
        if (unit === undefined || unit < this.max) {
            // this.product.unit = this.product.unit + 1;
            // this.$emit('input', this.newValue)
            this.updateProductInCart({id: id, unit: unit})
            this.totalProductPrice();
        }
    },
    minus: function () {
        if (this.newValue > this.min) {
            this.newValue = this.newValue - 1;
            // this.$emit('input', this.newValue)
        }
    },
    totalProductPrice(){
      for(let product of this.productInCart){
        console.log(product.product.productDetail_price ,product.unit)
        if (product.product.discount_discount !== null){
          this.totalPrice += product.product.productDetail_price-product.product.productDetail_price*product.product.discount_discount/100
        }else {
          this.totalPrice += product.product.productDetail_price
        }
      }
    }
  },
  mounted(){
    // this.totalProductPrice();
    for(let product of this.productInCart){
        console.log(product.product.productDetail_price ,product.unit)
        if (product.product.discount_discount !== null){
          this.totalPrice += (product.product.productDetail_price-product.product.productDetail_price*product.product.discount_discount/100)*product.unit
        }else {
          this.totalPrice += (product.product.productDetail_price)*product.unit
        }
      }
  }
};
</script>

<style scoped>
.minusplusnumber {
  border: 1px solid silver;
  border-radius: 5px;
  background-color: #fff;
  margin: 0 5px 0 5px;
  display: inline-block;
  user-select: none;
}

.minusplusnumber div {
  display: inline-block;
}

.minusplusnumber #field_container input {
  width: 15px;
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
.space {
  height: 110px;
}
.image{
  width: 100px;
}
</style>