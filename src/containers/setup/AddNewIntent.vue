<template>
  <b-modal
    id="modallg"
    ref="modallg"
    :title="$t(isEditMode ? 'setup.edit-new-intent' : 'setup.add-new-intent')"
    @hidden="resetModal"
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
      <b-button variant="outline-secondary" @click="hideModal('modallg')">{{
        $t("todo.cancel")
      }}</b-button>
      <b-button variant="primary" @click="addItem" class="mr-1">{{
        $t("todo.submit")
      }}</b-button>
    </template>
  </b-modal>
</template>
<script>
import { selected } from "blockly";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { mapMutations, mapActions, mapGetters } from "vuex";

const TodoAddNewModal = {
  components: {
    "v-select": vSelect,
  },
  props: ["isEditMode", "currentEditIntent", "isShowModal"],
  data() {
    return {
      newItem: {
        state: "",
        description: "",
        name: "",
      },
    };
  },

  watch: {
    isEditMode: function (newVal, oldVal) {
      // watch it
      if (!this?.currentEditIntent) {
        this.newItem = { state: "", description: "", name: "" };
      } else {
        this.newItem = { ...this.currentEditIntent };
      }
    },
    isShowModal: function (newVal, oldVal) {
      // watch it
      if (!this?.currentEditIntent) {
        this.newItem = { state: "", description: "", name: "" };
      } else {
        this.newItem = { ...this.currentEditIntent };
      }
    },
  },

  methods: {
    ...mapActions(["addNewIntent"]),
    hideModal(refname) {
      this.$refs[refname].hide();
      this.$emit("update:isEditMode", false);
      this.$emit("update:isShowEditModal", false);
    },
    resetModal() {
      this.$emit("update:isEditMode", false);
      this.$emit("update:isShowEditModal", false);
    },
    addItem() {
      if (!this.isEditMode) {
        this.addNewIntent({
          state: this.newItem.state,
          description: this.newItem.description,
          name: this.newItem.name,
        });
        this.newItem = { state: "", description: "", name: "" };
      } else {
        // write edit code
        this.addNewIntent(this.newItem);
      }

      this.hideModal("modallg");
    },
  },
};
export default TodoAddNewModal;
</script>
