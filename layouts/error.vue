<template>
  <v-app dark>
    <!-- <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1> -->
    <div align="center">
      <img src="https://media.doyouconvert.com/285/2021/6/9/404_Error.1000x750.jpeg" alt="">
    </div>
    <NuxtLink to="/home" align="center" class="homepage">
      <button><h3>Home page</h3></button>
    </NuxtLink>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}

body{
  overflow-y: hidden;
}

.homepage{
  text-decoration: none;
  color: white;
}

.homepage button {
  background: grey;
  padding: 10px;
  border-radius: 4px;
}
</style>
