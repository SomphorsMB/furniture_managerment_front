<template>
  <section>
      <v-btn @click=" visible = true">ADADAD</v-btn>
      <v-snackbar v-model="visible" auto-height color="success" multi-line="false" timeout="1500" top="true">
        <v-layout align-center pr-4>
            <v-icon class="pr-3" dark large>mdi-check-circle</v-icon>
            <strong>Add product to cart sucessfully</strong>
        </v-layout>
    </v-snackbar>
  </section>
</template>

<script>
export default {
    data(){
        return{
 
      visible: false
        }
    }
}
</script>

<style>

</style>