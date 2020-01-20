export const state = () => ({
  name: null
});

export const mutations = {
  scannedQR(state, payload) {
    console.log("test");
    state.name = payload;
  }
};
