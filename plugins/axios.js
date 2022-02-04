export default function ({ store, app: { $axios }, redirect }) {
    $axios.onRequest((config) => {
      console.log(store.getters['getToken'])
      if (store.getters['getToken']) {
        config.headers.Authorization = 'Bearer ' + store.getters['getToken']
      }
      return config
    })
  }