<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="80%" height="80vh" class="dialog">
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
                  <v-col cols="5" class="pa-0">
                    <v-card-text class="black white--text pa-1 cardDiscount" v-if="product.discount_discount !== null">-{{product.discount_discount}}%</v-card-text>
                      <v-img
          src="https://cdn.shopify.com/s/files/1/0279/9153/9746/products/furniture_2_1.jpg?v=1576499893"
          height="82vh"
        ></v-img>
                  </v-col>
                  <v-col cols="7" class="">
                      <h1 class="black--text text-uppercase">{{ product.product_name }}</h1>
                      <v-card-text class="d-flex px-0">
                          <span  class="green--text font-weight-bold" v-if="product.productDetail_unit > 0"> 
                            <v-icon  class="green--text">mdi-check-circle</v-icon>
                            In Stock
                            </span>
                          <span  class="red--text font-weight-bold" v-else>
                              <v-icon class="red--text">mdi-close-circle</v-icon>
                              Out Stock
                              </span>
                      </v-card-text>
                      <v-card-text class="pa-0 text-h7">
                          <span class="black--text font-weight-bold">Type: </span>
                          <span class="grey--text">{{ product.category_name }}</span>
                      </v-card-text>
                      <v-card-text class="pa-0 text-h7">
                          <span class="black--text font-weight-bold">Size: </span>
                          <span class="grey--text">{{ product.productDetail_size }}</span>
                      </v-card-text>
                      <v-card-text class="pa-0 text-h7">
                          <span class="black--text font-weight-bold">Total Unit: </span>
                          <span class="grey--text">{{ product.productDetail_unit }}</span>
                      </v-card-text>
                      
                      <v-card-text class="px-0 d-flex">
                          <v-card-title class="pa-0 text-h4 font-weight-bold black--text orange--text" v-if="product.discount_discount !== null">${{ product.productDetail_price-product.productDetail_price*product.discount_discount/100 }}</v-card-title>
                          <v-card-title class="pa-0 text-h4 font-weight-bold black--text orange--text" v-if="product.discount_discount === null">${{ product.productDetail_price }}</v-card-title>
                          <v-card-title class="py-0 text-h4 font-weight-bold black--text text-decoration-line-through orange--text" v-else>${{ product.productDetail_price }}</v-card-title>
                      </v-card-text>
                      <v-card-text class="pa-0">
                          <span class="font-weight-bold black--text">QTY</span>
                          <div class="minusplusnumber">
                                <div class="mpbtn minus text-h6 px-3" v-on:click="minus()">-</div>
                                <div id="field_container">
                                <input type="text" v-model="newValue" class="text-center" />
                                </div>
                                <div class="mpbtn plus text-h6" v-on:click="plus()">+</div>
                            </div>
                      </v-card-text>
                      <v-card-text class="px-0 d-flex justify-space-between">
                        <v-btn width="49%" class="rounded-0" dark>Add to cart</v-btn>
                        <!-- <v-btn width="49%">Add to cart</v-btn> -->
                      </v-card-text>
                      <v-card-title class="py-0 px-0 black--text">Description</v-card-title>
                      <v-divider></v-divider>
                      <v-card-subtitle class="px-0 pt-0">{{ product.productDetail_rawMaterial }}</v-card-subtitle>
                      <v-card-title class="pb-0 px-0 pt-0 black--text">Product source</v-card-title>
                      <v-divider></v-divider>
                      <v-card-text class="px-0 pt-0 d-flex">
                        <v-card-text class="pa-0 company-info">
                          <v-card-subtitle class="pl-0">
                            <span class="pa-0 black--text text-h7 font-weight-bold">Company:</span>
                             <span class="text-h7">{{ product.supplier_brand }}</span>
                          </v-card-subtitle>
                          <v-card-subtitle class="pt-0 pl-0">
                            <span class="pa-0 black--text text-h7 font-weight-bold">Country:</span>
                            <span class="text-h7">{{ product.supplier_country }}</span>
                          </v-card-subtitle>
                        </v-card-text>
                        <v-card-text class="company-info pa-0">
                        <v-img :src="'http://localhost:5000/api/product-details/image/'+product.supplier_logo" width="35%"></v-img>

                        </v-card-text>
                      </v-card-text>
                  </v-col>
              </v-row>
            
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ['product'],
  data: () => ({
    dialog: true,
    min: 1,
    max: 100,
    newValue: 1,
  }),
  methods:{
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
  }
}
</script>

<style scoped>
    .dialog{
        border: .5px solid gray;
    }
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
  width: 50px;
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
.company-info{
  width: 50%;
}
.cardDiscount{
  width: 80px;
  position: absolute;
  top: 50px;
  left: 25px;
  z-index: 2;
  text-align: center;
}

</style>