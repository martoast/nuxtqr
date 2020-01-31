<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <client-only>
        <MerchantReader></MerchantReader>
      </client-only>
      <v-card></v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {
    MerchantReader: () => import("@/components/MerchantReader.vue")
  },
  layout: "merchantsLayout"
};
</script>
