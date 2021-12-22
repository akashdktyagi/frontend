import axios from 'axios';

export const state = () => ({
  products: [
    {
      id: 1,
      title: 'Product 1',
      description: 'Akash ipsum dolor sit amet, consectetur adipiscing elit',
      price: 50,
      ratings: 3,
      reviews: 5,
      isAddedToCart: false,
      isAddedBtn: false,
      isFavourite: false,
      quantity: 1
    }
  
  ],
  userInfo: {
    isLoggedIn: false,
    isSignedUp: false,
    hasSearched: false,
    name: '',
    productTitleSearched: ''
  },
  systemInfo: {
    openLoginModal: false,
    openSignupModal: false,
    openCheckoutModal: false
  }
})

export const getters = {
  productsAdded: state => {
    return state.products.filter(el => {
      return el.isAddedToCart;
    });
  },
  productsAddedToFavourite: state => {
    return state.products.filter(el => {
      return el.isFavourite;
    });
  },
  getProductById: state => id => {
    return state.products.find(product => product.id == id);
  },
  isUserLoggedIn: state => {
    return state.userInfo.isLoggedIn;
  },
  isUserSignedUp: state => {
    return state.userInfo.isSignedUp;
  },
  getUserName: state => {
    return state.userInfo.name;
  },
  isLoginModalOpen: state => {
    return state.systemInfo.openLoginModal;
  },
  isSignupModalOpen: state => {
    return state.systemInfo.openSignupModal;
  },
  isCheckoutModalOpen: state => {
    return state.systemInfo.openCheckoutModal;
  },
  quantity: state => {
    return state.products.quantity;
  }
}

export const mutations = {
  addToCart: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isAddedToCart = true;
      }
    });
  },
  setAddedBtn: (state, data) => {
    state.products.forEach(el => {
      if (data.id === el.id) {
        el.isAddedBtn = data.status;
      }
    });
  },
  removeFromCart: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isAddedToCart = false;
      }
    });
  },
  removeProductsFromFavourite: state => {
    state.products.filter(el => {
      el.isFavourite = false;
    });
  },
  isUserLoggedIn: (state, isUserLoggedIn) => {
    state.userInfo.isLoggedIn = isUserLoggedIn;
  },
  isUserSignedUp: (state, isSignedUp) => {
    state.userInfo.isSignedUp = isSignedUp;
  },
  setHasUserSearched: (state, hasSearched) => {
    state.userInfo.hasSearched = hasSearched;
  },
  setUserName: (state, name) => {
    state.userInfo.name = name;
  },
  setProductTitleSearched: (state, titleSearched) => {
    state.userInfo.productTitleSearched = titleSearched;
  },
  showLoginModal: (state, show) => {
    state.systemInfo.openLoginModal = show;
  },
  showSignupModal: (state, show) => {
    state.systemInfo.openSignupModal = show;
  },
  showCheckoutModal: (state, show) => {
    state.systemInfo.openCheckoutModal = show;
  },
  addToFavourite: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isFavourite = true;
      }
    });
  },
  removeFromFavourite: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isFavourite = false;
      }
    });
  },
  quantity: (state, data) => {
    state.products.forEach(el => {
      if (data.id === el.id) {
        el.quantity = data.quantity;
      }
    });
  },
  SET_USER(state, authUser) {
    state.authUser = authUser
  },
  setProductsState(state,data){
    console.log(data);
    data.forEach(function(e){
      e.isAddedToCart=false;
      e.isAddedBtn=false;
      e.isFavourite=false;
    })
    state.products=data;
    // [{
    //   id: 1,
    //   title: 'Product 1',
    //   description: 'Akash ipsum dolor sit amet, consectetur adipiscing elit',
    //   price: 50,
    //   ratings: 3,
    //   reviews: 5,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // }];

  }
}

export const actions = {

  getProducts({ commit }) {
    axios.get('http://localhost:9095/getProduct')
        .then(response => {
            commit('setProductsState', response.data)
    })
  }

  // getAllProductsFromAPI({ commit }) {
  //   const res =  axios.get("http://localhost:9095/getProduct") ;
  //   console.log("Akash" + res);
  //   commit("GET_ALL_PRODUCTS", res.data);
  // }

  // async nuxtServerInit({ commit }) {
  //   const res = await this.$axios.get("/api/current_user")
  //   commit("SET_USER", res.data)
  // },

  // async logout({ commit }) {
  //   const { data } = await this.$axios.get("/api/logout")
  //   if (data.ok) commit("SET_USER", null)
  // },

  // async handleToken({ commit }, token) {
  //   const res = await this.$axios.post("/api/stripe", token)
  //   commit("SET_USER", res.data)
  // }
} 
