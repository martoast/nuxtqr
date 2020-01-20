export const state = () => ({
  name: null
});

export const mutations = {
  scannedQR(state, payload) {
    console.log("test");
    state.name = payload;
  }
};

export const actions = {
  async SCANNED({ commit }, payload) {
    console.log(payload);
    const messageRef = this.$fireStore.collection("users").doc(email);
    try {
      const messageDoc = await messageRef.get();
      var MenuItems = messageDoc.data().menu;

      console.log(MenuItems);

      commit("scannedQR", MenuItems);
    } catch (e) {
      alert(e);
      return;
    }
  }
};
