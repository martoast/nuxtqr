<template>
  <div>
    <div>
      <v-app light>
        <v-content>
          <section>
            <v-parallax height="400" src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg">
              <v-row justify="center" align="center">
                <v-col>
                  <v-layout column align-center justify-center class="white--text">
                    <div class="white--text mb-2 display-1 text-center">
                      Un Sistema Diseñado Para Los Restaurantes Mas Innovadores
                      de México
                    </div>
                  </v-layout>
                </v-col>
              </v-row>
              <v-row justify="center">
                <LoginModal />
              </v-row>

              <v-row justify="center">
                <RegisterModal />
              </v-row>
            </v-parallax>
          </section>
          <section>
            <v-parallax height="400" src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg">
              <v-row justify="center" align="center">
                <v-col>
                  <v-layout column align-center justify-center class="white--text">
                    <div class="white--text mb-2 display-1 text-center">Merchants</div>
                  </v-layout>
                </v-col>
              </v-row>
              <v-row justify="center">
                <MerchantLoginModal />
              </v-row>
            </v-parallax>
          </section>
        </v-content>
      </v-app>
    </div>
  </div>
</template>

<script>
import RegisterModal from "~/components/RegisterModal";
import LoginModal from "~/components/LoginModal";
import MerchantLoginModal from "~/components/MerchantLoginModal";
export default {
  layout: "landing",
  components: {
    RegisterModal,
    LoginModal,
    MerchantLoginModal
  },

  data() {
    return {
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"]
    };
  }
};
</script>
