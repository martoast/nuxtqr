<template>
  <div>
    <h1>{{todos}}</h1>
    <v-card min-width="400" class="mx-auto">
      <v-container>
        <v-row dense>
          <v-col v-for="(item, i) in items" :key="i" cols="12">
            <v-hover v-slot:default="{ hover }">
              <v-card
                :color="item.color"
                dark
                :elevation="hover ? 24 : 2"
                :class="{ 'on-hover': hover }"
              >
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title class="headline" v-text="item.title"></v-card-title>

                    <v-card-subtitle v-text="item.artist"></v-card-subtitle>
                  </div>

                  <v-avatar class="ma-3" size="125" tile>
                    <v-img :src="item.src"></v-img>
                  </v-avatar>
                </div>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        color: "#1F7087",
        src:
          "http://www.artitudesdesign.com/wp-content/uploads/2017/02/starbucks_featured_image-1.jpg",
        title: "shti",
        artist: "Foster the People"
      },
      {
        color: "#952175",
        src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
        title: "Halcyon Days",
        artist: "Ellie Goulding"
      },
      {
        color: "#1F7087",
        src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        title: "Supermodel",
        artist: "Foster the People"
      }
    ]
  }),
  computed: {
    todos() {
      return this.$store.state.name;
    }
  }
};
</script>
<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
