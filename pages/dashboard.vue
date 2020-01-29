<template>
  <div>
    <v-card min-width="400" class="mx-auto">
      <v-container>
        <v-row dense>
          <v-col v-for="(item, i) in Restaurants" :key="i" cols="12">
            <v-hover v-slot:default="{ hover }">
              <v-card
                :color="item.color"
                dark
                :elevation="hover ? 24 : 2"
                :class="{ 'on-hover': hover }"
                @click="OpenModal(item)"
              >
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title class="headline" v-text="item.title"></v-card-title>
                  </div>

                  <v-avatar class="ma-3" size="125" tile>
                    <v-img :src="item.src"></v-img>
                  </v-avatar>
                </div>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <div>
      <v-row justify="center">
        <v-dialog v-model="dialog" width="600px">
          <v-card>
            <div class="text-center">
              <v-progress-circular
                :rotate="360"
                :size="100"
                :width="15"
                :value="value"
                color="teal"
              >{{ VisitedScore }}</v-progress-circular>
            </div>
            <v-row justify="center">
              <v-card-title>
                <span class="headline">{{ this.VisitedTitle }}</span>
              </v-card-title>
            </v-row>

            <v-container v-if="Discounts.length > 0">
              <v-row dense>
                <v-col v-for="(discount, i) in this.Discounts" :key="i" cols="12">
                  <v-card>
                    <div class="d-flex flex-no-wrap justify-space-between">
                      <div>
                        <v-card-title class="headline" v-text="discount.title"></v-card-title>
                        <v-card-subtitle>{{discount.description}}</v-card-subtitle>
                      </div>
                      <v-avatar class="ma-3" size="125" tile>
                        <h3>{{discount.cost}}</h3>
                      </v-avatar>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        color: "#385F73",
        src:
          "http://www.artitudesdesign.com/wp-content/uploads/2017/02/starbucks_featured_image-1.jpg",
        title: "shti",
        artist: "Foster the People"
      },
      {
        color: "#385F73",
        src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
        title: "Halcyon Days",
        artist: "Ellie Goulding"
      },
      {
        color: "#385F73",
        src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        title: "Supermodel",
        artist: "Foster the People"
      }
    ],
    visited: null,
    Restaurants: [],
    dialog: false,
    VisitedTitle: null,
    VisitedScore: null,
    interval: {},
    value: 0,
    email: null,
    Discounts: []
  }),
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0);
      }
      this.value += 10;
    }, 1000);
  },
  created() {
    const vm = this;

    vm.$fireAuth.onAuthStateChanged(async function(user) {
      if (user) {
        let EMAIL = user.email;
        vm.email = EMAIL;
        try {
          const messageRef = await vm.$fireStore.collection(EMAIL).get();

          let visited = messageRef.docs.map(doc => doc.data());

          for (const item in visited) {
            console.log(visited[item].id);
            // vm.Restaurants.push(vm.visited[item].id);
            // console.log(vm.Restaurants);

            const messageRef2 = await vm.$fireStore
              .collection("merchants")
              .where("id", "==", visited[item].id)
              .get()
              .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  // doc.data() is never undefined for query doc snapshots
                  // console.log(doc.id, " => ", doc.data());
                  let data = doc.data();
                  vm.Restaurants.push(data);
                  console.log(vm.Restaurants);
                });
              })
              .catch(function(error) {
                console.log("Error getting documents: ", error);
              });
          }
        } catch (e) {
          alert(e);
          return;
        }
      } else {
        // No user is signed in.
        console.log("No User logged in");
      }
    });
  },
  computed: {
    todos() {
      return this.$store.state.name;
    }
  },
  methods: {
    async readFromFirestore() {
      const messageRef = this.$fireStore.collection("message").doc("message");
      try {
        const messageDoc = await messageRef.get();
        alert(messageDoc.data().message);
      } catch (e) {
        alert(e);
        return;
      }
    },
    async OpenModal(item) {
      const vm = this;
      const messageRef = vm.$fireStore.collection(vm.email).doc(item.id);

      try {
        const messageDoc = await messageRef.get();

        vm.VisitedScore = messageDoc.data().score;

        const messageRef2 = await vm.$fireStore
          .collection("merchants")

          .where("id", "==", item.id)
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              // console.log(doc.id, " => ", doc.data());
              let data = doc.data().discounts;
              vm.Discounts = data;
              console.log(vm.Discounts);
            });
          })
          .catch(function(error) {
            console.log("Error getting documents: ", error);
          });
      } catch (e) {
        alert(e);
        return;
      }

      this.VisitedTitle = item.title;
      this.dialog = true;
    }
  }
};
</script>
<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
.v-progress-circular {
  margin: 1rem;
}
</style>
