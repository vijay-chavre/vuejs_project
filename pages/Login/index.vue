<template>
  <!-- Must have the app property -->
  <!-- <v-app-bar app></v-app-bar></v-app-bar> -->

  <v-app>
    <v-row no-gutters>
      <v-col cols="6" class="hidden-sm-and-down">
        <v-card
          class="d-flex justify-center align-center  text-h1 rounded-tr-0"
          color="light-blue darken-1"
          height="100%"
          dark
        >
          Welcome User!
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="d-flex justify-center align-center flex-column"
          height="100%"
          flat
        >
       <!-- //   <v-card
        //     class="d-flex justify-center align-self-start text-h1 hidden-sm-and-up"
        //     color="light-blue darken-1"
        //     height="30%"
        //     width="100%"
        //     dark
        //     flat
        //   >
        //     Welcome User!
        //   </v-card>-->
          <v-card width="70%">
            <v-toolbar flat class="d-flex justify-center"
            :color="brandColorPrimary"
            dark
            >
              <v-icon>mdi-account</v-icon>
              <v-spacer></v-spacer>
              <v-toolbar-title class="font-weight-light">
                User SignIn
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                :disabled="!isEditing"
                color="white"
                label="Email"
              ></v-text-field>
                 <v-text-field
                    :disabled="!isEditing"
                    color="white"
                    label="Password"
                  ></v-text-field>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
            <v-btn  text :disabled="!isEditing" :color="brandColorPrimary" @click="save" dark>
                Forgot Password ?
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn :disabled="!isEditing" :color="brandColorPrimary" @click="save" dark>
                Save
              </v-btn>
            </v-card-actions>
            <v-spacer></v-spacer>
            
            <v-bottom-navigation
                :value="value"
                color="primary"
              >
                <v-btn class="active">
                  <span>New User ?</span>
                  <v-icon>mid-question</v-icon>
                </v-btn>
              </v-bottom-navigation>
            <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left>
              Your profile has been updated
            </v-snackbar>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>




<script>
export default {
  layout: "authLayout",
  data() {
    return {
      hasSaved: false,
      isEditing: true,
      model: null,
      brandColorPrimary: 'light-blue darken-1',
      states: [
        { name: "Florida", abbr: "FL", id: 1 },
        { name: "Georgia", abbr: "GA", id: 2 },
        { name: "Nebraska", abbr: "NE", id: 3 },
        { name: "California", abbr: "CA", id: 4 },
        { name: "New York", abbr: "NY", id: 5 },
      ],
    };
  },

  methods: {
    customFilter(item, queryText, itemText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    save() {
      this.isEditing = true;
      this.hasSaved = true;
    },
  },
};
</script>

<style scoped>
</style>