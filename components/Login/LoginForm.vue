<template>
  <v-card min-width="65%">
    <!-- <v-img
      height="100"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img> -->
    <v-toolbar
      flat
      class="d-flex justify-center text--bold"
      color="white"
    >
      <v-spacer></v-spacer>
      <v-toolbar-title class="font-weight-semi-bold"> LOGIN </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-container padding="10">
    <v-card-text>
      <v-text-field
        :disabled="!isEditing"
        color="primary"
        label="Email"
        prepend-inner-icon="mdi-email"
        filled
      ></v-text-field>
      <v-text-field
        :disabled="!isEditing"
        prepend-inner-icon="mdi-lock"
        color="primary"
        label="Password"
        filled
        type="password"
      ></v-text-field>
   
    <v-card flat class="d-flex justify-space-between">
      <v-btn :color="brandColorPrimary"  text>
        <span>New User ?</span>
        <v-icon>mid-question</v-icon>
      </v-btn>
       <v-btn
        text
        :color="brandColorPrimary"
        @click="save"
      >
         <span>Forgot Password ?</span>
        <v-icon>mid-question</v-icon>
      </v-btn>
    </v-card>

    <v-card-actions>
      <v-btn
        :disabled="!isEditing"
        :color="brandColorPrimary"
        @click="save"
        dark
        class="submit-button"
        x-large
        width="100%"
      >
        Submit
      </v-btn>
    </v-card-actions>
     </v-card-text>
    </v-container>
    <v-spacer></v-spacer>

    
    <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left>
      Your profile has been updated
    </v-snackbar>
  </v-card>
</template>




<script>
export default {
  data() {
    return {
      hasSaved: false,
      isEditing: true,
      model: null,
      brandColorPrimary: "light-blue darken-1",
    };
  },

  methods: {
    save() {
      this.isEditing = true;
      this.hasSaved = true;
    },
  },
};
</script>

<style scoped>
.submit-button {
  width: 100%;
}
</style>