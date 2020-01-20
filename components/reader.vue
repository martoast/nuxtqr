<template>
  <client-only>
    <vue-qr-reader
      v-on:code-scanned="codeArrived"
      v-on:error-captured="errorCaptured"
    />
  </client-only>
</template>

<script>
import NoSSR from "vue-no-ssr";
import VueQrReader from "vue-qr-reader/dist/lib/vue-qr-reader.umd.js";

export default {
  components: {
    "no-ssr": NoSSR,
    VueQrReader
  },
  data() {
    return {
      event: null
    };
  },
  methods: {
    codeArrived(event) {
      this.event = event;
      console.log(event);
      // alert(event);
      this.writeToFirestore(event);
      // this.$store.commit("scannedQR", event);
      // this.$store.dispatch("SCANNED", event);
    },

    errorCaptured(error) {
      switch (error.name) {
        case "NotAllowedError":
          this.errorMessage = "Camera permission denied.";
          break;
        case "NotFoundError":
          this.errorMessage = "There is no connected camera.";
          break;
        case "NotSupportedError":
          this.errorMessage =
            "Seems like this page is served in non-secure context.";
          break;
        case "NotReadableError":
          this.errorMessage =
            "Couldn't access your camera. Is it already in use?";
          break;
        case "OverconstrainedError":
          this.errorMessage = "Constraints don't match any installed camera.";
          break;
        default:
          this.errorMessage = "UNKNOWN ERROR: " + error.message;
      }
      console.error(this.errorMessage);
    },
    async writeToFirestore(payload) {
      const vm = this;

      vm.$fireAuth.onAuthStateChanged(async function(user) {
        if (user) {
          console.log(user.email);
          let eventmsg = vm.event;
          const messageRef = vm.$fireStore.collection("users").doc(user.email);
          try {
            await messageRef.set(
              {
                messege: eventmsg
              },
              { merge: true }
            );
          } catch (e) {
            alert(e);
            return;
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
