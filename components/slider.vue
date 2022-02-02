<template>
  <v-img :src="lists[onboarding]" height="50vh"
  >
    <v-window v-model="onboarding" >
      <v-window-item
        v-for="n in length"
        :key="`card-${n}`"
      >
        <v-card
          height="200"
          width="50%"
          elevation="4"
          class="mx-auto d-flex align-end mt-5 py-2 card"
        >
          <v-row
            class="fill-height pt-0"
            align="center"
            justify="center"
          >
            <v-card-text class="text-center mb-0 py-0 white--text text-h6">
              Transparent themed, for background-imaged slides. Background color black added for demonstration purposes.
            </v-card-text>
            <v-btn class="grey--text">Show More</v-btn>
          </v-row>
        </v-card>
      </v-window-item>
    </v-window>
 
    <v-card-actions class=" window justify-space-between d-flex align-end ">
      <v-btn
        color="white"
        @click="prev"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-item-group
        v-model="onboarding"
        class="text-center"
        mandatory
      >
        <v-item
          v-for="n in length"
          :key="`btn-${n}`"
          v-slot="{ active, toggle }"
        >
          <v-btn
            :input-value="active"
            icon
            @click="toggle"
          >
            <v-icon>mdi-record</v-icon>
          </v-btn>
        </v-item>
      </v-item-group>
      <v-btn
        @click="next"
        color="white"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-img>
</template>

<script>
  export default {
    data: () => ({
      
      onboarding: 0,
      lists: [
          'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/posters-in-cozy-apartment-interior-royalty-free-image-943910360-1534189931.jpg',
          "https://www.precedent-furniture.com/sites/precedent-furniture.com/files/styles/header_slideshow/public/3360_SL%20CR.jpg?itok=3Ltk6red",
          "https://i.insider.com/61a9152f0ed48c0019e566d3?width=1000&format=jpeg&auto=webp",
          "https://www.purbafurniture.ca/pub/media/catalog/product/cache/3cb5ebea06d2dc1f62d87c2b26c041d5/m/o/modern-bedroom-set.jpeg"
      ],
      length: 4,
      
    }),

    methods: {
      next () {
        this.onboarding = this.onboarding + 1 === this.length
          ? 0
          : this.onboarding + 1
      },
      prev () {
        this.onboarding = this.onboarding - 1 < 0
          ? this.length - 1
          : this.onboarding - 1
      },
    },
  }
</script>

<style scoped>
    .window{
        height: 20vh;
    }
    .card{
        background: rgba(115, 113, 113, 0.326);
    }


    .image{
        height: 20vh;
    }
</style>