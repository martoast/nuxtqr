<template>
  <div>
    <v-app>
      <v-app-bar app color="indigo">
        <v-toolbar-title class="white--text">nuxt-QR</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>

      <Nuxt />

      <v-footer color="indigo" app>
        <span class="white--text">&copy; 2019</span>
      </v-footer>
    </v-app>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false
    };
  }
};
</script>
