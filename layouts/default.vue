<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="Logout()" to="/">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-icon @click="GotoCamera()">mdi-camera</v-icon>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; Martos 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "dashboard",
          to: "/dashboard"
        },
        {
          icon: "mdi-camera",
          title: "Camera",
          to: "/readerPage"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: ""
    };
  },
  methods: {
    GotoCamera() {
      this.$router.push("/readerPage");
    },
    async Logout() {
      try {
        await this.$fireAuth.signOut();
        // signed out
        alert("Signed Out");
      } catch (e) {
        // an error
      }
    }
  }
};
</script>
