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
                  <v-col cols="8" class="font-weight-bold"> Item </v-col>
                  <v-col cols="2" class="text-center font-weight-bold"> QTY </v-col>
                  <v-col cols="2" class="text-center font-weight-bold"> Price </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row class="elevation-1 mt-2" v-for="n in 12" :key="n">
                  <v-col cols="8" class="d-flex align-start">
                    <v-img
                      src="https://cdn.shopify.com/s/files/1/0279/9153/9746/products/furniture_18_1_180x.jpg?v=1576499523"
                      width="35%"
                    ></v-img>
                    <v-card-subtitle class="pt-0 text-h6"
                      >Antique Mirror Beau Accent Table</v-card-subtitle
                    >
                  </v-col>
                  <v-col cols="2" class="text-center px-0">
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
                          v-model="newValue"
                          class="text-center"
                        />
                      </div>
                      <div class="mpbtn plus text-h6" v-on:click="plus()">
                        +
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="2" class="text-center mt-4 px-0">
                    <span class="orange--text">$8227.00</span><br />
                    <span class="text-decoration-line-through orange--text"
                      >$8227.00</span
                    ><br />
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
                      <v-card-subtitle class="py-0 font-weight-bold orange--text">$3143.12</v-card-subtitle>
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
                        value="The Woodman s"
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
export default {
  data: () => ({
    dialog: true,
    min: 1,
    max: 100,
    newValue: 1,
    sellers: ['Somphors NGOUN', 'Pros NOB', 'Bunsal HUL']
  }),
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
</style>