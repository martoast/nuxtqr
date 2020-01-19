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
  methods: {
    codeArrived(event) {
      console.log(event.detail[0]);
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
    }
  }
};
</script>
