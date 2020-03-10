<template>
  <div>
    <h1>merchant dashboard</h1>
    <div>
      <MainGraph />
    </div>
    <v-item-group>
      <v-container>
        <v-row>
          <v-col v-for="n in 3" :key="n" cols="12" md="4">
            <v-item>
              <DashboardGraph />
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </div>
</template>
<script>
import DashboardGraph from "~/components/DashboardGraph.vue";
import MainGraph from "~/components/MainGraph.vue";
export default {
  layout: "merchantsLayout",
  components: { DashboardGraph, MainGraph },
  data() {
    return {};
  }
};
</script>
