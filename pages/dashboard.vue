<template>
  <div>
    <h1>{{todos}}</h1>
    <v-card min-width="400" class="mx-auto">
      <v-container>
        <v-row dense>
          <v-col v-for="(item, i) in items" :key="i" cols="12">
            <v-hover v-slot:default="{ hover }">
              <v-card
                :color="item.color"
                dark
                :elevation="hover ? 24 : 2"
                :class="{ 'on-hover': hover }"
              >
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title class="headline" v-text="item.title"></v-card-title>

                    <v-card-subtitle v-text="item.artist"></v-card-subtitle>
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
    <v-card min-width="400" class="mx-auto">
      <v-container>
        <v-row dense>
          <v-col v-for="(item, i) in visited" :key="i" cols="12">
            <v-hover v-slot:default="{ hover }">
              <v-card dark :elevation="hover ? 24 : 2" :class="{ 'on-hover': hover }">
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title class="headline" v-text="item.score"></v-card-title>

                    <v-card-subtitle></v-card-subtitle>
                  </div>

                  <v-avatar class="ma-3" size="125" tile>
                    <!-- <v-img :src="item.src"></v-img> -->
                  </v-avatar>
                </div>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        color: "#1F7087",
        src:
          "http://www.artitudesdesign.com/wp-content/uploads/2017/02/starbucks_featured_image-1.jpg",
        title: "shti",
        artist: "Foster the People"
      },
      {
        color: "#952175",
        src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
        title: "Halcyon Days",
        artist: "Ellie Goulding"
      },
      {
        color: "#1F7087",
        src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        title: "Supermodel",
        artist: "Foster the People"
      }
    ],
    visited: null,
    Restaurants: []
  }),
  created() {
    const vm = this;

    vm.$fireAuth.onAuthStateChanged(async function(user) {
      if (user) {
        let EMAIL = user.email;
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
                  console.log(doc.id, " => ", doc.data());
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
</style>
