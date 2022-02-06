export default function ({ store, app: { $axios }, redirect }) {
    $axios.onRequest((config) => {
      const token = window.localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    })
  }