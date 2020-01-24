<template>
  <div>
    <client-only>
      <vue-qr-reader
        v-on:code-scanned="codeArrived"
        v-on:error-captured="errorCaptured"
      />
    </client-only>
  </div>
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
      this.writeToFirestore(event);
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
<style scoped>
.fullscreen {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: black;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
</style>
