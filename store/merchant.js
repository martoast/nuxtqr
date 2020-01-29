export const state = () => ({
  DiscountItems: []
});

export const actions = {
  async GET_FIREMENU({ commit }, email) {
    console.log("GET_FIREMENU fired");

    console.log(email);
    const messageRef = this.$fireStore.collection("users").doc(email);
    try {
      const messageDoc = await messageRef.get();
      var DiscountItems = messageDoc.data().menu;

      console.log(DiscountItems);

      commit("setMenu", DiscountItems);
    } catch (e) {
      alert(e);
      return;
    }
  },

  SAVE_MENU({ commit }) {
    this.$store.state["menu/DiscountItems"].then(response => {
      commit("setMenu", response);
    });
  }
};

export const mutations = {
  setMenu(state, DiscountItems) {
    state.DiscountItems = DiscountItems;
    console.log("SetMenu Success");
  },

  decrementProductInventory(state, { id }) {
    const item = state.DiscountItems.find(item => item.id === id);
    item.inventory--;
  },
  add(state, payload) {
    this.self = this;
    state.DiscountItems.push(payload);
    console.log(state.DiscountItems);
  },
  remove(state, item) {
    state.DiscountItems.splice(state.DiscountItems.indexOf(item), 1);
  },
  edit(state, item) {
    state.DiscountItems.splice(state.DiscountItems.indexOf(item), 1);
    state.DiscountItems.push(item);
  }
};
export const getters = {
  getMenu(state) {
    if (state.DiscountItems === undefined || state.DiscountItems.length == 0) {
      console.log("No Menu Created");
      return;
    } else {
      return state.DiscountItems;
    }
  },
  getFoodMenu(state) {
    if (state.DiscountItems === undefined || state.DiscountItems.length == 0) {
      console.log("No Menu Created");
      return;
    } else {
      var result = state.DiscountItems.filter(item => item.type == "Food");
      return result;
    }
  },
  // getItem: state => id => {
  //   console.log(state.DiscountItems.find(item => item.id === id));
  //   return state.DiscountItems.find(item => item.id === id);
  // }

  getItem(state, id) {
    console.log("Geter called");
    // console.log(id);
    // return state.DiscountItems.find(item => item.id === id);
  },

  getDrinksMenu(state) {
    if (state.DiscountItems === undefined || state.DiscountItems.length == 0) {
      console.log("No Menu Created");
      return;
    } else {
      var result = state.DiscountItems.filter(item => item.type == "Drink");
      return result;
    }
  },

  getDessertsMenu(state) {
    if (state.DiscountItems === undefined || state.DiscountItems.length == 0) {
      console.log("No Menu Created");
      return;
    } else {
      var result = state.DiscountItems.filter(item => item.type == "Dessert");
      return result;
    }
  }
};
