<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="450px">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on">Log in</v-btn>
        </template>

        <v-card class="elevation-12">
          <v-toolbar color="secondary" dark>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-row align="center" justify="space-around">
              <v-icon @click="googleSignIn" large color="blue">mdi-google</v-icon>
            </v-row>
            <v-form>
              <v-text-field
                label="Email"
                name="email"
                v-model="email"
                type="text"
                color="secondary"
              ></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                v-model="password"
                name="password"
                type="password"
                color="secondary"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" class="primary" @click="loginUser(email, password)">Login</v-btn>
            <v-btn @click="googleSignIn" color="#4285F4">
              <v-icon>mdi-gmail</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      dialog: false
    };
  },
  methods: {
    async loginUser(email, password) {
      if (email && password) {
        try {
          await this.$fireAuth.signInWithEmailAndPassword(email, password);
          $nuxt._router.push("/merchantdashboard");
        } catch (e) {
          alert(e);
        } finally {
          console.log("success");
        }
      } else {
        //make button different color green
      }
    },
    async googleSignIn() {
      var provider = new this.$fireAuthObj.GoogleAuthProvider();

      provider.addScope("https://www.googleapis.com/auth/plus.login");

      this.$fireAuth
        .signInWithPopup(provider)
        .then(function(authData) {
          console.log(authData.user.email);
          $nuxt._router.push("/merchantdashboard");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
