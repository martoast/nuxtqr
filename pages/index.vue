<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <client-only>
        <reader></reader>
      </client-only>
      <v-card></v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  components: {
    Logo,
    VuetifyLogo,

    reader: () => import("@/components/reader.vue")
  }
};
</script>
