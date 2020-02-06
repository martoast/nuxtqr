<template>
  <div>
    <v-card>
      <v-card-title>Discount Configuration</v-card-title>
      <v-spacer></v-spacer>

      <DiscountTable :DiscountItems="DiscountItems" />

      <v-card-actions>
        <v-row justify="center" align="center">
          <DiscountCreateModal />

          <v-btn class="secondary" @click="writeToFirestore()">Save Changes</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import DiscountTable from "~/components/DiscountConfigTable";
import DiscountCreateModal from "~/components/DiscountCreateModal";
export default {
  layout: "merchantsLayout",
  components: {
    DiscountTable,
    DiscountCreateModal
  },
  data() {
    return {};
  },
  created() {
    const vm = this;

    vm.$fireAuth.onAuthStateChanged(async function(user) {
      if (user) {
        try {
          const messageRef = vm.$fireStore
            .collection("merchants")
            .doc(user.email);

          await messageRef
            .get()
            .then(function(doc) {
              if (doc.exists) {
                if (doc.data().discounts) {
                  console.log(doc.data().discounts);
                  let Discounts = doc.data().discounts;
                  vm.$store.commit("merchant/setMenu", Discounts);
                } else {
                  console.log("no Discounts have been created!");
                }
              } else {
                // doc.data() will be undefined in this case
                console.log("No Discounts has been created!");
              }
            })
            .catch(function(error) {
              console.log("Error getting document:", error);
            });
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
    DiscountItems: {
      get() {
        return this.$store.getters["merchant/getMenu"];
      },
      set(value) {
        this.$store.commit("merchant/setMenu", value);
      }
    }
  },

  methods: {
    async writeToFirestore() {
      const vm = this;

      vm.$fireAuth.onAuthStateChanged(async function(user) {
        if (user) {
          let All_discounts = vm.DiscountItems;
          const messageRef = vm.$fireStore
            .collection("merchants")
            .doc(user.email);
          try {
            await messageRef.set(
              {
                discounts: All_discounts
              },
              { merge: true }
            );
          } catch (e) {
            alert(e);
            return;
          }
          alert("Discount Changes Saved");
        } else {
          alert("Must be signed in to perform action.");
        }
      });
    }
  }
};
</script>
