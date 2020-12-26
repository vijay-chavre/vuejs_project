<template>
  <v-card min-width="70%">
    <v-toolbar
      flat
      class="d-flex justify-center"
      :color="brandColorPrimary"
      dark
    >
      <v-spacer></v-spacer>
      <v-toolbar-title class="font-weight-light"> LOGIN </v-toolbar-title>
    </v-toolbar>
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
    </v-card-text>
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
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!isEditing"
        :color="brandColorPrimary"
        @click="save"
        dark
        class="submit-button"
        x-large
      >
        Submit
      </v-btn>
       <v-spacer></v-spacer>
    </v-card-actions>
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