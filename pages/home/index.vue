<template>
   <main>
       <slider />
      <home-card v-for="n in data" :key="n.name" :data="n"/>
      <v-card-title>
        <h2 class="mx-auto mt-6">Brading</h2>
      </v-card-title>
      <div class=" mx-auto mx-0 px-0">
        <!-- <product-card v-for="n of 4" :key="n" /> -->
        <v-row class="mx-10">
            <v-col cols="3"  xl="2" lg="3" md="4" sm="6" xs="12" class="px-2" v-for="m in brands" :key="m.title">
                   <v-img width="70%" class="mx-auto" :src="m.logo"></v-img>
            </v-col>
        </v-row>
      </div>
      <v-card-actions>
        <v-btn
      class="ma-2 mx-auto rounded-0 py-4 mt-6"
      width="18%"
      outlined
      color="black"
      
    >
      View All
    </v-btn>
      </v-card-actions>
   </main>
</template>

<script>
import HomeCard from '~/components/homeCard.vue'
import slider from '~/components/slider.vue'
export default {
  components: { slider, HomeCard },
  data(){
      return{
          data:[
              {title: "Product Discount", to: '/a'},
              {title: "Best Sell", to: '/b'},
              {title: "Product Out Of Stock", to: '/c'},
          ],
          brands: [
              {name: "asdfghjkl", logo: "https://www.furniturebrandsinternational.co.uk/media/logo/stores/4/logo.png"},
              {name: "asdfghjkl", logo: "https://grandluxuryfurniture.com/wp-content/uploads/2019/06/lfd-png-logo.png"},
              {name: "asdfghjkl", logo: "https://www.kare-design.com/migrate/img/logo.png"},
              {name: "asdfghjkl", logo: "https://www.pinclipart.com/picdir/big/366-3669007_today-nann-is-an-international-brand-of-furniture.png"},
          ]
      }
  }

}
</script>

<style>

</style>