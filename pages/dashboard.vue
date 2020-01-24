<template>
  <div>
    <h1>{{ todos }}</h1>
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
                    <v-card-title
                      class="headline"
                      v-text="item.title"
                    ></v-card-title>
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
              >
                {{ VisitedScore }}
              </v-progress-circular>
            </div>
            <v-row justify="center"
              ><v-card-title>
                <span class="headline">{{ this.VisitedTitle }}</span>
              </v-card-title></v-row
            >

            <v-card-text
              >Lorem ipsum dolor sit amet, semper quis, sapien id natoque elit.
              Nostra urna at, magna at neque sed sed ante imperdiet, dolor
              mauris cursus velit, velit non, sem nec. Volutpat sem ridiculus
              placerat leo, augue in, duis erat proin condimentum in a eget, sed
              fermentum sed vestibulum varius ac, vestibulum volutpat orci ut
              elit eget tortor. Ultrices nascetur nulla gravida ante arcu.
              Pharetra rhoncus morbi ipsum, nunc tempor debitis, ipsum
              pellentesque, vitae id quam ut mauris dui tempor, aptent non.
              Quisque turpis. Phasellus quis lectus luctus orci eget rhoncus.
              Amet donec vestibulum mattis commodo, nulla aliquet, nibh
              praesent, elementum nulla. Sit lacus pharetra tempus magna neque
              pellentesque, nulla vel erat. Justo ex quisque nulla accusamus
              venenatis, sed quis. Nibh phasellus gravida metus in, fusce aenean
              ut erat commodo eros. Ut turpis, dui integer, nonummy pede placeat
              nec in sit leo. Faucibus porttitor illo taciti odio, amet viverra
              scelerisque quis quis et tortor, curabitur morbi a. Enim tempor
              at, rutrum elit condimentum, amet rutrum vitae tempor torquent
              nunc. Praesent vestibulum integer maxime felis. Neque aenean quia
              vitae nostra, tempus elit enim id dui, at egestas pulvinar.
              Integer libero vestibulum, quis blandit scelerisque mattis
              fermentum nulla, tortor donec vestibulum dolor amet eget, elit
              nullam. Aliquam leo phasellus aliquam curabitur metus a, nulla
              justo mattis duis interdum vel, mollis vitae et id, vestibulum
              erat ridiculus sit pulvinar justo sed. Vehicula convallis, et
              nulla wisi, amet vestibulum risus, quam ac egestas. Et vitae,
              nulla gravida erat scelerisque nullam nunc pellentesque, a
              dictumst cras augue, purus imperdiet non. Varius montes cursus
              varius vel tortor, nec leo a qui, magni cras, velit vel
              consectetuer lobortis vel. Nibh erat et wisi felis leo porttitor,
              sapien nibh sapien pede mi, sed eget porttitor, repellendus arcu
              ac quis. Luctus vulputate aut est sem magna, placerat accumsan
              nunc vestibulum ipsum ac auctor, maecenas lorem in ut nec mauris
              tortor, doloribus varius sem tortor vestibulum mollis, eleifend
              tortor felis tempus lacus eu eu. Eleifend vel eu, nullam maecenas
              mauris nec nunc euismod, tortor porta ridiculus potenti, massa
              tristique nam magna, et wisi placerat et erat ante. Eget pede erat
              in facilisis, fermentum venenatis sodales. Ac tortor sociis et non
              animi tristique, rhoncus malesuada, ut arcu volutpat scelerisque
              sollicitudin, elit curabitur dui pede purus dolor, integer aenean
              risus taciti nulla eleifend accumsan. At pulvinar diam parturient,
              interdum mi velit aliquet et a. Arcu at ac placerat eget justo
              semper, purus sociis curabitur mi ipsum consequat ut, mollis
              vestibulum, est ante ornare lacus sem. Neque magna mauris, commodo
              quisque, praesent semper suscipit lobortis nam. Justo malesuada
              cursus ac nunc litora nunc. Tellus ac, in lobortis nunc, montes
              lectus purus fermentum. Ac sit wisi. Sodales aliquam, sed
              vestibulum nullam arcu sit risus arcu, id luctus vitae lorem nibh,
              integer nec nullam class cursus mi, purus arcu lectus. Vel ante
              suscipit volutpat potenti mattis sed, wisi eu placerat aliquam
              erat, lectus morbi lobortis at assumenda. Consequat neque purus
              ipsum voluptas odio, netus vestibulum ut nec, suspendisse
              pellentesque nec enim in. Wisi dictum sed semper a, ipsum erat
              tellus habitasse est, erat sem ornare, vitae quisque ultricies.
              Dui sed blandit. Tempor et faucibus justo sed luctus, nec vitae
              vitae. Nunc nibh pede, ipsum vestibulum aenean leo ante ultricies,
              nam cras quis sed penatibus amet. In mauris a. Integer metus
              mauris tortor, et rutrum vestibulum ultricies, ut phasellus in
              ullamcorper ut mollit, eu justo. Cursus pretium venenatis. Cras
              pellentesque vel sodales accumsan aenean. Feugiat metus sit nec in
              aliquet amet, porttitor pretium vulputate massa. Consequat ipsum
              luctus quisque adipiscing libero. Wisi sollicitudin. Eget vitae ac
              lobortis, lorem natoque vestibulum et, aliquet faucibus at morbi
              nibh, vel condimentum. Massa unde orci sed id sed, odio donec
              congue nec praesent amet. Hymenaeos velit lacus, quis vivamus
              libero tempus duis, eu nisi eu, ipsum at accumsan pede justo morbi
              donec, massa et libero sit risus neque tortor. Ut sed sed etiam
              hendrerit dapibus, quis metus suspendisse nibh. Fringilla tempor
              felis augue magna. Cum arcu a, id vitae. Pellentesque pharetra in
              cras sociis adipiscing est. Nibh nec mattis at maecenas, nisl orci
              aliquam nulla justo egestas venenatis, elementum duis vel porta
              eros, massa vitae, eligendi imperdiet amet. Nec neque luctus
              suscipit, justo sem praesent, ut nisl quisque, volutpat torquent
              wisi tellus aliquam reprehenderit, curabitur cras at quis massa
              porttitor mauris. Eros sed ultrices. Amet dignissim justo urna
              feugiat mauris litora, etiam accumsan, lobortis a orci
              suspendisse. Semper ac mauris, varius bibendum pretium, orci urna
              nunc ullamcorper auctor, saepe sem integer quam, at feugiat
              egestas duis. Urna ligula ante. Leo elementum nonummy. Sagittis
              mauris est in ipsum, nulla amet non justo, proin id potenti platea
              posuere sit ut, nunc sit erat bibendum. Nibh id auctor, ab nulla
              vivamus ultrices, posuere morbi nunc tellus gravida vivamus.
              Mauris nec, facilisi quam fermentum, ut mauris integer, orci
              tellus tempus diam ut in pellentesque. Wisi faucibus tempor et
              odio leo diam, eleifend quis integer curabitur sit scelerisque ac,
              mauris consequat luctus quam penatibus fringilla dis, vitae lacus
              in, est eu ac tempus. Consectetuer amet ipsum amet dui, sed
              blandit id sed. Tellus integer, dignissim id pede sodales quis,
              felis dolorem id mauris orci, orci tempus ut. Nullam hymenaeos.
              Curabitur in a, tortor ut praesent placerat tincidunt interdum, ac
              dignissim metus nonummy hendrerit wisi, etiam ut. Semper praesent
              integer fusce, tortor suspendisse, augue ligula orci ante
              asperiores ullamcorper. In sit per mi sed sed, mi vestibulum mus
              nam, morbi mauris neque vitae aliquam proin senectus. Ac amet arcu
              mollis ante congue elementum, inceptos eget optio quam
              pellentesque quis lobortis, sollicitudin sed vestibulum
              sollicitudin, lectus parturient nullam, leo orci ligula ultrices.
              At tincidunt enim, suspendisse est sit sem ac. Amet tellus
              molestie est purus magna augue, non etiam et in wisi id. Non
              commodo, metus lorem facilisi lobortis ac velit, montes neque sed
              risus consectetuer fringilla dolor. Quam justo et integer aliquam,
              cursus nulla enim orci, nam cursus adipiscing, integer torquent
              non, fringilla per maecenas. Libero ipsum sed tellus purus et.
              Duis molestie placerat erat donec ut. Dolor enim erat massa
              faucibus ultrices in, ante ultricies orci lacus, libero
              consectetuer mauris magna feugiat neque dapibus, donec pretium et.
              Aptent dui, aliquam et et amet nostra ligula. Augue curabitur duis
              dui volutpat, tempus sed ut pede donec. Interdum luctus, lectus
              nulla aenean elit, id sit magna, vulputate ultrices pellentesque
              vel id fermentum morbi. Tortor et. Adipiscing augue lorem cum non
              lacus, rutrum sodales laoreet duis tortor, modi placerat facilisis
              et malesuada eros ipsum, vehicula tempus. Ac vivamus amet non
              aliquam venenatis lectus, sociosqu adipiscing consequat nec arcu
              odio. Blandit orci nec nec, posuere in pretium, enim ut,
              consectetuer nullam urna, risus vel. Nullam odio vehicula massa
              sed, etiam sociis mauris, lacus ullamcorper, libero imperdiet non
              sodales placerat justo vehicula. Nec morbi imperdiet. Fermentum
              sem libero iaculis bibendum et eros, eget maecenas non nunc, ad
              pellentesque. Ut nec diam elementum interdum. Elementum vitae
              tellus lacus vitae, ipsum phasellus, corporis vehicula in ac sed
              massa vivamus, rutrum elit, ultricies metus volutpat. Semper wisi
              et, sollicitudin nunc vestibulum, cursus accumsan nunc pede tempus
              mi ipsum, ligula sed. Non condimentum ac dolor sit. Mollis eu
              aliquam, vel mattis mollis massa ut dolor ante, tempus lacinia
              arcu. Urna vestibulum lorem, nulla fermentum, iaculis ut congue ac
              vivamus. Nam libero orci, pulvinar nulla, enim pellentesque
              consectetuer leo, feugiat rhoncus rhoncus vel. Magna sociosqu
              donec, dictum cursus ullamcorper viverra. Ultricies quis orci
              lorem, suspendisse ut vestibulum integer, purus sed lorem pulvinar
              habitasse turpis. +</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false"
                >Disagree</v-btn
              >
              <v-btn color="green darken-1" text @click="dialog = false"
                >Agree</v-btn
              >
            </v-card-actions>
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
    Restaurants: [],
    dialog: false,
    VisitedTitle: null,
    VisitedScore: null,
    interval: {},
    value: 0,
    email: null
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
