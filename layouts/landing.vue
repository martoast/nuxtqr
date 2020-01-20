<template>
  <div>
    <v-app>
      <v-app-bar app color="indigo">
        <v-toolbar-title class="white--text">Eazy POS</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <RegisterModal />
          <LoginModal />
        </v-toolbar-items>
      </v-app-bar>

      <Nuxt />

      <v-footer color="indigo" app>
        <span class="white--text">&copy; 2019</span>
      </v-footer>
    </v-app>
  </div>
</template>
<script>
import LoginModal from "~/components/LoginModal";
import RegisterModal from "~/components/RegisterModal";
export default {
  components: {
    LoginModal,
    RegisterModal
  },
  data() {
    return {
      dialog: false
    };
  }
};
</script>
