<template>
  <b-modal
    id="modalright"
    ref="modalright"
    :title="$t('todo.add-new-title')"
    modal-class="modal-right"
  >
    <b-form>
      <b-form-group :label="$t('setup.intent-name')">
        <b-form-input v-model="newItem.name" />
      </b-form-group>
      <b-form-group :label="$t('setup.intent-state')">
        <b-form-input v-model="newItem.state" />
      </b-form-group>
      <b-form-group :label="$t('setup.intent-description')">
        <b-textarea v-model="newItem.description" :rows="2" :max-rows="2" />
      </b-form-group>
    </b-form>
    <template slot="modal-footer">
      <b-button variant="outline-secondary" @click="hideModal('modalright')">{{
        $t("todo.cancel")
      }}</b-button>
      <b-button variant="primary" @click="addItem()" class="mr-1">{{
        $t("todo.submit")
      }}</b-button>
    </template>
  </b-modal>
</template>
<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { mapMutations, mapActions } from "vuex";

const TodoAddNewModal = {
  components: {
    "v-select": vSelect,
  },
  props: ["categories", "labels", "statuses"],
  data() {
    return {
      newItem: { state: "", description: "", name: "" },
    };
  },
  methods: {
    ...mapActions(["addNewIntent"]),
    hideModal(refname) {
      this.$refs[refname].hide();
    },
    addItem() {
      const date = new Date();
      this.addNewIntent({
        state: this.newItem.state,
        description: this.newItem.description,
        name: { first: this.newItem.name, last: "" },
      });
      this.newItem = {
        title: "",
        category: "",
        detail: "",
        label: "",
        status: "",
      };
      this.hideModal("modalright");
    },
  },
};
export default TodoAddNewModal;
</script>
