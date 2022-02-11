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
    search:null,
    products: [],
    loginErr: '',
    meta: [],
    links: [],
    categories:[],
    brands:[],
    sellers:[],
    products: [],
    productDiscount: [],
    productInCart: [],
    visibleWarning: false,
    visibleSucess: false,
  })

  export const mutations = {
    [AUTH_MUTATIONS.SET_USER] (state, { id, email }) {
      state.id = id
      state.email = email
    },

    [AUTH_MUTATIONS.SET_PAYLOAD] (state, access_token, refresh_token = null ) {
      state.access_token = access_token
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
    loginmessage(state, message){
      state.loginErr = message
    },
    addproducts(state, products){
      for(let product of products.items) {
        state.products.push(product)
      }
      state.meta = products.meta;
      state.links = products.links;
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
    },
    addProductCart(state, product){
      state.productInCart.push({...product})
    },
    setProductInCart(state, products){
      state.productInCart = products;
    },
    addsearch(state,search){
      state.search=search;
    },
    updateProductInCart(state, {id, unit}){
      let array = []
      for(let product of state.productInCart){
        if (product.productCart_id == id){
            product.productCart_unit = unit;
            array.push({...product});
        }else{
          array.push({...product});
        }
      }
    },
    deleteProductInCart(state, id){
      let array = []
      for(let product of state.productInCart){
        if (product.productCart_id != id){
            // product.productCart_unit = unit;
            array.push({...product});
        }
      }
      state.productInCart = array;
    },
    deleteProductAllInCart(state){
      state.productInCart = []
    },
    setVisibleWarning(state, visible){
      state.visibleWarning = visible;
    },
    setVisibleSucess(state, visible){
      state.visibleSucess = visible;
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
        commit('loginmessage', '');
        commit(AUTH_MUTATIONS.SET_USER, res.data.user)
        commit(AUTH_MUTATIONS.SET_PAYLOAD, res.data.access_token, null)
        this.$router.push('/home')
      }).catch((err) => {
        commit('loginmessage',err.response.data.message);
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
      await this.$axios.get('sellers').then(() => {
      })
    },

    async createProduct({ commit, append },{product,productDetail}){
      await this.$axios.$post('/products',product).then(product=>{
        productDetail.append("product",product.productId);
        this.$axios.$post('/product-details',productDetail).then(()=>{

        }).catch(error=>{
          console.log(error)
        });
      }).catch(error=>{
        console.log(error)
      });
    },

    async createDiscount({ commit, dispatch }, discount){
      await this.$axios.$post('/discount',discount).then(()=>{
      }).catch(error=>{
        console.log(error)
      });
    },

    async createCategory({ commit, dispatch }, category){
      await this.$axios.$post('/categories',category).then(()=>{
      }).catch(error=>{
        console.log(error)
      });
    },

    async createBrand({ commit, dispatch }, brand){
      await this.$axios.$post('/product-suppliers',brand).then(()=>{
      });
    },

    async createSeller({ commit, dispatch }, seller){
      await this.$axios.$post('/sellers',seller).then(()=>{
      }).catch(error=>{
        console.log(error);
      });
    },

    async register({ commit }, { email, password }) {
      // make an API call to register the user
      const { data: { data: { user, payload } } } = await this.$axios.post(
        '/auth/register',
        { email, password }
      )
      // commit the user and tokens to the state
      commit(AUTH_MUTATIONS.SET_USER, user)
      commit(AUTH_MUTATIONS.SET_PAYLOAD, payload)
    },

    async setSearch({ commit, state },value){
      await commit('addsearch', value);
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
        await this.$axios.$get('/products').then(res=>{
          commit('addproducts', res)
      }).catch(error=>{
          console.log(error)
      });
    },

    async getAllCategories({commit, state}){
        await this.$axios.$get('/categories').then(res=>{
          commit('addcategories', [...res])
      }).catch(error=>{
          console.log(error)
      });
    },

    async getAllBrands({commit, state}){
      await this.$axios.$get('/product-suppliers').then(res=>{
        commit('addbrands', [...res.data])
      }).catch(error=>{
          console.log(error)
      });
    },

    async getAllsellers({commit, state}){
      await this.$axios.$get('/sellers').then(res=>{
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

    async addProductToCart({commit, state}, {product, newValue}){
      for (let oldProduct of state.productInCart){
        if (oldProduct.productCart_productId === product){
          if(oldProduct.productCart_unit+newValue > oldProduct.productDetail_unit){
            await commit('setVisibleWarning', true);
            newValue = oldProduct.productDetail_unit - oldProduct.productCart_unit;
          }else{
            await commit('setVisibleSucess', true);
          }

        }else{
          await commit('setVisibleSucess', true);
        }
      }
      if (state.productInCart.length == 0){
        await commit('setVisibleSucess', true);
      }
      setTimeout(() => {
        commit('setVisibleWarning', false);
        commit('setVisibleSucess', false);
      }, 2000)
      await this.$axios.$post('/product-cart', {unit: newValue, product: product}).then(()=> {
      })
    },

    async updateProductInCart({commit, state}, {id, unit, product}){
      await this.$axios.$patch('/product-cart/'+id, {unit: unit, product: product}).then(()=> {
      })
      commit('updateProductInCart', {id: id, unit: unit})
    },
    // UpdateProduct Detail
    async updateProductDetail({ commit, dispatch }, {id,productDetail}){
      await this.$axios.$patch('/product-details/'+id,productDetail).then(()=>{
      })
    },

    async updateProduct({ commit, append },{productId,product,productDetailId,productDetail}){
      await this.$axios.$patch('/products/'+productId,product).then(()=>{
        productDetail.append("product",productId);
        this.$axios.$patch('/product-details/'+productDetailId,productDetail).then(()=>{
        }).catch(error=>{
          console.log(error)
        });
      }).catch(error=>{
        console.log(error)
      });
    },

    async updateCategory({ commit, dispatch }, {id,category}){
      await this.$axios.$patch('/categories/'+id,category).then(()=>{
      }).catch(error=>{
        console.log(error)
      });
    },

    async updateBrand({ commit, dispatch }, {id,supplier}){
      await this.$axios.$patch('/product-suppliers/'+id,supplier).then(()=>{

      }).catch(error=>{
        console.log(error)
      });
    },

    async updateSeller({ commit, dispatch }, {id,seller}){
      await this.$axios.$patch('/sellers/'+id,seller).then(()=>{
      }).catch(error=>{
        console.log(error)
      });
    },
    async updateDiscount({ commit, dispatch }, {id,discount}){
      await this.$axios.$patch('/discount/'+id,discount).then(()=>{
      }).catch(error=>{
        console.log(error)
      });
    },

    async deleteProduct({commit, state},id){
      await this.$axios.$delete('/products/'+id).then(()=>{
      })
    },

    async deleteSeller({commit, state},id){
      await this.$axios.$delete('/sellers/'+id).then(()=>{
      })
    },

    async deleteCategory({commit, state},id){
      await this.$axios.$delete('/categories/'+id).then(()=>{
      })
    },

    async deleteSupplier({commit, state},id){
      await this.$axios.$delete('/product-suppliers/'+id).then(()=>{
      })
    },
    async getProductInCart({commit}){
      await this.$axios.$get('/product-cart').then(res=>{
        commit('setProductInCart', [...res.data])
    })
    },
    async deleteProductFromCart({commit}, id){
      await this.$axios.$delete('/product-cart/'+id).then(()=>{})
      commit('deleteProductInCart', id)
    },

    checkOutProduct({commit, state}, { sellerId }){
      this.$axios.$delete('/product-cart').then(()=>{
        commit('deleteProductAllInCart')
      })
      this.$axios.$post('/product-solds/'+sellerId, state.productInCart).then(()=>{
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

    async productInCart(state){
      return state.productInCart;
    },

    products(state){
      return state.products;
    },
    categories(state){
      return state.categories;
    },
    brands(state){
      return state.brands;
    },
    sellers(state){
      return state.sellers;
    },
    rols(state){
      return state.role;
    },
    loginmessage(state){
      return state.loginErr;
    },
    search(state){
      return state.search;
    }
  }