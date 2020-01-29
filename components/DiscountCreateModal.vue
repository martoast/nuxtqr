<template>
  <div>
    <div>
      <v-row>
        <v-dialog v-model="dialog2" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on">Create Discount</v-btn>
          </template>
          <v-form v-model="valid" lazy-validation>
            <v-card>
              <v-card-title>
                <span class="headline">Create Discount</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row
                    ><v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Item name*"
                        v-model="DiscountTitle"
                        :rules="nameRules"
                        color="secondary"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        :items="[
                          1,
                          2,
                          3,
                          4,
                          5,
                          6,
                          7,
                          8,
                          9,
                          10,
                          11,
                          12,
                          13,
                          14,
                          15
                        ]"
                        label="Point Cost*"
                        v-model="DiscountCost"
                        required
                      ></v-select>
                    </v-col>
                  </v-row>

                  <v-textarea
                    filled
                    auto-grow
                    label="Describe the Discount"
                    rows="4"
                    row-height="30"
                    shaped
                    v-model="DiscountDescription"
                  ></v-textarea>
                </v-container>

                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog2 = false"
                  >Close</v-btn
                >
                <v-btn
                  v-if="
                    (valid &&
                      this.DiscountTitle &&
                      this.DiscountDescription &&
                      this.DiscountCost != null) ||
                      false
                  "
                  color="secondary"
                  @click="SaveDiscount()"
                  >Save</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog2: false,
      dialog3: false,

      nameRules: [v => !!v || "Name is required"],

      priceRules: [
        d => !!d || "price required",
        d => /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/.test(d) || "Invalid entry"
      ],
      sizeRules: [v => !!v || "At least one Size option is required"],
      loading: false,
      valid: true,
      valid2: true,
      DiscountCost: null,
      DiscountDescription: null,
      DiscountTitle: null,
      DiscountType: null,

      SelectedSizes: []
    };
  },
  methods: {
    SaveDiscount() {
      this.dialog2 = false;
      var title = this.DiscountTitle;
      var cost = this.DiscountCost;
      var type = this.DiscountType;
      var description = this.DiscountDescription;

      let id = Math.random()
        .toString(36)
        .substr(2, 9);
      let discount = {
        id,
        title,
        type,
        cost,
        description
      };
      const vm = this;

      // vm.$fireAuth.onAuthStateChanged(async function(user) {
      //   if (user) {
      //     const messageRef = vm.$fireStore
      //       .collection("merchants")
      //       .doc(user.email);
      //     try {
      //       await messageRef.set({
      //         message: "Nuxt-Fire with Firestore rocks!"
      //       });
      //     } catch (e) {
      //       alert(e);
      //       return;
      //     }
      //     alert("Success.");
      //   }
      // });
      this.$store.commit("merchant/add", discount);
      // Reset values
      this.DiscountTitle = null;
      this.DiscountCost = null;
      this.DiscountType = null;
    },
    decrement() {
      this.DiscountCost--;
    },
    increment() {
      this.DiscountCost++;
    },
    async writeToFirestore(payload) {
      const vm = this;

      vm.$fireAuth.onAuthStateChanged(async function(user) {
        if (user) {
          let EMAIL = user.email;
          const increment = vm.$fireStoreObj.FieldValue.increment(1);
          const messageRef = vm.$fireStore.collection(EMAIL).doc(payload);

          if (messageRef) {
            try {
              const increment = vm.$fireStoreObj.FieldValue.increment(1);
              await messageRef.update({
                score: increment,
                id: payload
              });
            } catch (e) {
              await messageRef.set(
                {
                  score: 1,
                  id: payload
                },
                { merge: true }
              );
            }
          } else {
            console.log("error");
          }

          alert("Saved to Firebase");
        } else {
          alert("Must be signed in to perform action.");
        }
      });
    }
  }
};
</script>
