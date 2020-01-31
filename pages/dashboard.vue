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
                  <v-hover v-slot:default="{ hover }">
                    <v-card
                      v-if="VisitedScore >= discount.cost"
                      @click="OpenDiscount(discount)"
                      :elevation="hover ? 24 : 2"
                      :class="{ 'on-hover': hover }"
                    >
                      <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                          <v-card-title class="headline" v-text="discount.title"></v-card-title>
                          <v-card-subtitle>
                            {{
                            discount.description
                            }}
                          </v-card-subtitle>
                        </div>
                        <v-avatar class="ma-3" size="125" tile>
                          <h3>{{ discount.cost }} pts</h3>
                        </v-avatar>
                      </div>
                    </v-card>
                  </v-hover>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
    <div>
      <v-row justify="center">
        <v-dialog v-model="dialog2" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">
              Are you sure you want spend
              {{ this.DiscountCost }} points?
            </v-card-title>
            <v-card-text>You will not be able to refund this purchase.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog2 = false">Disagree</v-btn>
              <v-btn color="green darken-1" text @click="SpendPoints()">Agree</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
    <div id="app">
      <v-row justify="center">
        <v-dialog v-model="dialog3" max-width="290">
          <v-card>
            <v-card-title>Screen shot this code and present at the register.</v-card-title>
            <v-row justify="center">
              <qriously :value="DiscountID" :size="200" background="white" />
            </v-row>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    visited: null,
    Restaurants: [],
    dialog: false,
    dialog2: false,
    dialog3: false,
    VisitedTitle: null,
    VisitedScore: null,
    interval: {},
    value: 0,
    email: null,
    Discounts: [],
    DiscountCost: null,
    RestaurantID: null,
    MerchantEmail: null,
    ID: [],
    DiscountID: null
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
      vm.RestaurantID = item.id;
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
              let merchemail = doc.data().email;
              vm.Discounts = data;
              vm.MerchantEmail = merchemail;
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
    },
    OpenDiscount(discount) {
      this.DiscountCost = discount.cost;
      this.dialog2 = true;
    },
    async SpendPoints() {
      // console.log(this.RestaurantID);
      // console.log(this.DiscountCost - 1);

      const vm = this;

      vm.$fireAuth.onAuthStateChanged(async function(user) {
        if (user) {
          let EMAIL = user.email;

          const messageRef = vm.$fireStore
            .collection(EMAIL)
            .doc(vm.RestaurantID);

          if (messageRef) {
            try {
              const decrement = vm.$fireStoreObj.FieldValue.increment(
                -vm.DiscountCost
              );
              await messageRef.update({
                score: decrement,
                id: vm.RestaurantID
              });
            } catch (e) {
              console.log(e);
            } finally {
              vm.dialog2 = false;
              let id = Math.random()
                .toString(36)
                .substr(2, 9);
              vm.DiscountID = id;

              const messageRef = vm.$fireStore.collection("codes").doc(id);
              try {
                await messageRef.set({
                  merchantID: vm.RestaurantID,
                  email: EMAIL,
                  time: new Date().toLocaleString(),
                  couponID: id
                });
              } catch (e) {
                alert(e);
                return;
              }
              alert("Success.");

              vm.dialog3 = true;
            }
          } else {
            console.log("error");
          }
        } else {
          alert("Must be signed in to perform action.");
        }
      });
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
