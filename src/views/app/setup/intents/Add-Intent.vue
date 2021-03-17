<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('menu.add-intent')" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12">
        <add-new-intent-wizard></add-new-intent-wizard>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import AddNewIntentWizard from "@/containers/setup/AddNewIntentWizard";
export default {
  components: {
    "add-new-intent-wizard": AddNewIntentWizard,
  },
};
</script>
