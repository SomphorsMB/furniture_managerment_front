// reusable aliases for mutations
export const AUTH_MUTATIONS = {
    SET_USER: 'SET_USER',
    SET_PAYLOAD: 'SET_PAYLOAD',
    LOGOUT: 'LOGOUT',
  }
  
  export const state = () => ({
    access_token: null, // JWT access token
    refresh_token: null, // JWT refresh token
    id: null, // user id
    email: null, // user email address
  })
  
  export const mutations = {
    [AUTH_MUTATIONS.SET_USER] (state, { id, email }) {
      state.id = id
      state.email = email
    },
  
    [AUTH_MUTATIONS.SET_PAYLOAD] (state, access_token, refresh_token = null ) {
      state.access_token = access_token
      // console.log('Payload', access_token)
      if (refresh_token) {
        state.refresh_token = refresh_token
      }
      
    },
  
    [AUTH_MUTATIONS.LOGOUT] (state) {
      state.id = null
      state.email = null
      state.access_token = null
      state.refresh_token = null
    },
  }
  
  export const actions = {
    async login ({ commit, dispatch }, { email, password }) {
      await this.$axios.post(
        '/auth/login', 
        { email, password }
      ).then(res => {
        window.localStorage.setItem('token',res.data.access_token);
        commit(AUTH_MUTATIONS.SET_USER, res.data.user)
        commit(AUTH_MUTATIONS.SET_PAYLOAD, res.data.access_token, null)
        this.$router.push('/home')
      })
      
      
    },
    async getSellers () {
       await this.$axios.get('sellers').then(res => {
        console.log(res)
      })
      
      
    },
    
  
    async register ({ commit }, { email, password }) {
      // make an API call to register the user
      const { data: { data: { user, payload } } } = await this.$axios.post(
        '/auth/register', 
        { email, password }
      )
      
      // commit the user and tokens to the state
      commit(AUTH_MUTATIONS.SET_USER, user)
      commit(AUTH_MUTATIONS.SET_PAYLOAD, payload)
    },



  
    // given the current refresh token, refresh the user's access token to prevent expiry
    async refresh ({ commit, state }) {
      const { refresh_token } = state
  
      // make an API call using the refresh token to generate a new access token
      const { data: { data: { payload } } } = await this.$axios.post(
        '/auth/refresh', 
        { refresh_token }
      )
  
      commit(AUTH_MUTATIONS.SET_PAYLOAD, payload)
    },
  
    // logout the user
    logout ({ commit, state }) {
      commit(AUTH_MUTATIONS.LOGOUT)
    },
  }
  
  export const getters = {
    // determine if the user is authenticated based on the presence of the access token
    isAuthenticated: (state) => {
      return state.access_token && state.access_token !== ''
    },
    getToken(state){
      // console.log(state.access_token)

      return state.access_token;
    }
  }