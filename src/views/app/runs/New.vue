<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('menu.runs-new')" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row class="justify-content-md-center">
      <b-colxx xxs="6">
        <b-card class="mb-4" title="New">
          <b-form
            @submit.prevent="onValitadeFormSubmit"
            class="av-tooltip tooltip-label-right"
          >
            <b-form-group :label="$t('forms.name')">
              <b-form-input
                type="text"
                v-model="$v.name.$model"
                :state="!$v.name.$error"
              />
              <b-form-invalid-feedback v-if="!$v.name.required"
                >Please enter your name</b-form-invalid-feedback
              >
              <b-form-invalid-feedback
                v-else-if="!$v.name.minLength || !$v.name.maxLength"
                >Your name must be between 2 and 16 characters</b-form-invalid-feedback
              >
              <b-form-invalid-feedback v-else-if="!$v.name.alpha"
                >Your name must be composed only with letters</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group :label="$t('State')">
              <b-form-input
                type="text"
                v-model="$v.state.$model"
                :state="!$v.name.$error"
              />
              <b-form-invalid-feedback v-if="!$v.state.required"
                >Please enter your state</b-form-invalid-feedback
              >
              <b-form-invalid-feedback
                v-else-if="!$v.name.minLength || !$v.state.maxLength"
                >Your name must be between 2 and 16 characters</b-form-invalid-feedback
              >
              <b-form-invalid-feedback v-else-if="!$v.state.alpha"
                >Your name must be composed only with letters</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group :label="$t('Description')">
              <b-textarea v-model="$v.description.$model" :rows="2" :max-rows="2" />
              <b-form-invalid-feedback v-if="!$v.description.required"
                >Please enter your name</b-form-invalid-feedback
              >
              <b-form-invalid-feedback
                v-else-if="!$v.description.minLength || !$v.description.maxLength"
                >Your name must be between 2 and 16 characters</b-form-invalid-feedback
              >
              <b-form-invalid-feedback v-else-if="!$v.description.alpha"
                >Your name must be composed only with letters</b-form-invalid-feedback
              >
            </b-form-group>
            <b-button type="submit" variant="primary" class="mt-4">{{
              $t("forms.submit")
            }}</b-button>
          </b-form>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
const {
  required,
  maxLength,
  minLength,
  alpha,
  email,
  sameAs,
  numeric,
  maxValue,
  minValue,
  helpers,
} = require("vuelidate/lib/validators");

const upperCase = helpers.regex("upperCase", /^[A-Z]*$/);

export default {
  data() {
    return {
      name: "",
      state: "",
      description: "",
    };
  },
  mixins: [validationMixin],
  validations: {
    name: {
      required,
      maxLength: maxLength(16),
      minLength: minLength(2),
      alpha,
    },
    state: {
      required,
      maxLength: maxLength(16),
      minLength: minLength(2),
      alpha,
    },
    description: {
      required,
      maxLength: maxLength(1000),
      minLength: minLength(2),
      alpha,
    },
    email: {
      required,
      email,
    },
    emailAgain: {
      required,
      email,
      sameAsEmail: sameAs("email"),
    },
    number: {
      required,
      numeric,
    },
    max: {
      required,
      numeric,
      maxValue: maxValue(5),
    },
    min: {
      required,
      numeric,
      minValue: minValue(5),
    },
    withRegex: {
      required,
      upperCase,
    },
  },
  methods: {
    onValitadeFormSubmit() {
      this.$v.$touch();
      console.log(
        JSON.stringify({
          name: this.name,
          email: this.email,
          emailAgain: this.emailAgain,
          max: this.max,
          min: this.min,
          withRegex: this.withRegex,
        })
      );
    },
  },
};
</script>
