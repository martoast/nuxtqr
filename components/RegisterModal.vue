<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="450px">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on">Register</v-btn>
        </template>

        <v-card class="elevation-12">
          <v-toolbar color="secondary" dark>
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Email"
                name="email"
                v-model="email"
                :rules="emailRules"
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
            <v-btn color="secondary" class="primary" @click="createUser(email, password)">Login</v-btn>
            <v-btn @click="googleSignIn" color="#4285F4">
              <v-icon>mdi-google</v-icon>
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
      dialog: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    async createUser() {
      try {
        await this.$fireAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        alert("Account Created");
      } catch (e) {
        alert(e);
      }
    },
    async googleSignIn() {
      var provider = new this.$fireAuthObj.GoogleAuthProvider();

      provider.addScope("https://www.googleapis.com/auth/plus.login");

      this.$fireAuth
        .signInWithPopup(provider)
        .then(function(authData) {
          console.log(authData.user.email);
          $nuxt._router.push("/dashboard");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
