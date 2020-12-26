<template>
  <!-- Must have the app property -->
  <!-- <v-app-bar app></v-app-bar></v-app-bar> -->
  <v-app>
    <v-row no-gutters>
      <v-col cols="6" class="hidden-sm-and-down">
        <v-card
          class="d-flex justify-center align-center text-h1 rounded-tr-0"
          color="light-blue darken-1"
          height="100%"
          dark
        >
          Welcome User!
        </v-card>
      </v-col>
      <v-col class="6">
        <v-card
          class="d-flex justify-center align-center flex-column"
          height="100%"
          flat
        >
          <LoginForm />
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>




<script>
export default {
  layout: "authLayout",
};
</script>

<style scoped>
</style>