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
    role:null,
    products: [],
    categories:[],
    brands:[],
    sellers:[],
    products: [],
    productDiscount: [],
    productInCart: [],
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
      state.role = null
      state.access_token = null
      state.refresh_token = null

    },

    addproducts(state, products){
      state.products = products
      console.log(state.products)
    },
    addcategories(state,categories){
      state.categories = categories
    },
    addbrands(state,brands){
      state.brands = brands
    },
    addsellers(state,sellers){
      state.sellers = sellers;
    },
    addrole(state,role){
      state.role = role;

    },
    addproductDiscount(state, productDiscount){
      state.productDiscount = productDiscount;
      console.log(state.productDiscount)

    },
    addProductCart(state, product){
      state.productInCart.push({...product})
      console.log(state.productInCart)
    },
    setProductInCart(state, products){
      state.productInCart = products;
    }
  }
  
  export const actions = {
    async login ({ commit, dispatch }, { email, password }) {
      await this.$axios.post(
        '/auth/login', 
        { email, password }
      ).then(res => {
        window.localStorage.setItem('role',res.data.user.role);
        window.localStorage.setItem('token',res.data.access_token);
        commit(AUTH_MUTATIONS.SET_USER, res.data.user)
        commit(AUTH_MUTATIONS.SET_PAYLOAD, res.data.access_token, null)
        this.$router.push('/home')
      })
      
      
    },
    // logout the user
    logout ({ commit, state }) {
      window.localStorage.setItem('token',null);
      window.localStorage.setItem('role',null);
      this.$router.push('/login')
      this.$axios.$post('/auth/logout');
      commit(AUTH_MUTATIONS.LOGOUT)
    },

    async getUserRole({commit,state}){
      const role = window.localStorage.getItem('role');
      console.log(role)
      commit('addrole',role)
    },

    async getSellers () {
       await this.$axios.get('sellers').then(res => {
        console.log(res)
      })
      
      
    },
    async createProduct({ commit, append },{product,productDetail}){
      await this.$axios.$post('/products',product).then(product=>{
        productDetail.append("product",product.productId);
        this.$axios.$post('/product-details',productDetail).then(res=>{
          console.log(res)
        }).catch(error=>{
          console.log(error)
      });
      }).catch(error=>{
        console.log(error)
      });
    },

    async createDiscount({ commit, dispatch }, discount){
      await this.$axios.$post('/discount',discount).then(discount=>{
        console.log(discount);
      }).catch(error=>{
        console.log(error)
      });
    },
    
    async createCategory({ commit, dispatch }, category){
      await this.$axios.$post('/categories',category).then(category=>{
        console.log(category);
      }).catch(error=>{
        console.log(error)
      });
    },

    
    async createBrand({ commit, dispatch }, brand){
      await this.$axios.$post('/product-suppliers',brand).then(brand=>{
        console.log(brand);
      });
    },
    async createSeller({ commit, dispatch }, seller){
      await this.$axios.$post('/sellers',seller).then(seller=>{
        console.log(seller);
      });
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


    async getAllProduct({commit, state}){
      // const allProducts = [];
        await this.$axios.$get('/products').then(res=>{
          commit('addproducts', [...res.data])
      }).catch(error=>{
          console.log(error)
      });
      // commit('addproducts', allProducts);

    },
    async getAllCategories({commit, state}){
        await this.$axios.$get('/categories').then(res=>{
          // console.log(res)
          commit('addcategories', [...res])
      }).catch(error=>{
          console.log(error)
      });

    },
    async getAllBrands({commit, state}){
      await this.$axios.$get('/product-suppliers').then(res=>{
        console.log(res.data)
        commit('addbrands', [...res.data])
      }).catch(error=>{
          console.log(error)
      });

    },
    async getAllsellers({commit, state}){
      await this.$axios.$get('/sellers').then(res=>{
        console.log(res)
        commit('addsellers', [...res])
      }).catch(error=>{
          console.log(error)
      });
    },

    async getAllProductDiscount({commit, state}){
        await this.$axios.$get('/products/product-discount').then(res=>{
          commit('addproductDiscount', [...res.data])
      }).catch(error=>{
          console.log(error)
      });
    },
  
    async addProductToCart({commit}, {product, newValue}){
      const newProduct = {
        product: product,
        unit: newValue
      }
      commit('addProductCart', {...newProduct})
    },

    async updateProductInCart({commit, state}, {id, unit}){
      let array = []
     for(let product of state.productInCart){
      console.log(id, unit)

       if (product.product.productDetail_id == id){
          product.unit = unit;
          array.push({...product});
       }else{
        array.push({...product});
       }
     }

     commit('setProductInCart', [...array])
    },

    // logout the user
    logout ({ commit, state }) {
      commit(AUTH_MUTATIONS.LOGOUT)

    },
    async deleteProduct({commit, state},id){
      await this.$axios.$delete('/products/'+id).then(res=>{
          console.log(res);
      })
    },
    async deleteSeller({commit, state},id){
      await this.$axios.$delete('/sellers/'+id).then(res=>{
          console.log(res);
      })
    },
    async deleteCategory({commit, state},id){
      await this.$axios.$delete('/categories/'+id).then(res=>{
          console.log(res);
      })
    },
    async deleteSupplier({commit, state},id){
      await this.$axios.$delete('/product-suppliers/'+id).then(res=>{
          console.log(res);
      })
    }
  
    
  }



  
  export const getters = {
    // determine if the user is authenticated based on the presence of the access token
    isAuthenticated: (state) => {
      return state.access_token && state.access_token !== ''
    },
    getToken(state){
      return state.access_token;
    },

    productInCart(state){
      return state.productInCart;
    },

    products(state){
      return state.products;
    },
    categories(state){
      console.log('hash',state.categories);
      return state.categories;
    },
    brands(state){
      console.log('hash',state.brands);
      return state.brands;
    },
    sellers(state){
      console.log('hash',state.sellers);
      return state.sellers;
    },
    rols(state){
      return state.role;
    }
  }