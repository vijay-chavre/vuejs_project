<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('menu.all-intents')" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <div class="d-flex flex-row mb-4">
      <div class="d-inline-block">
        <b-button
          v-b-modal.modalright
          @click="setEditMode()"
          size="lg"
          class="top-right-button"
          >{{ $t("todo.add-new") }}</b-button
        >
        <b-dropdown
          id="ddown1"
          :text="`${$t('common.page-size')} ${perPage}`"
          class="mr-1 float-md-left btn-group"
          size="lg"
        >
          <b-dropdown-item
            v-for="(option, index) in pageOptions"
            :key="`page${index}`"
            @click="changePageSize(option)"
            >{{ option }}</b-dropdown-item
          >
        </b-dropdown>
      </div>
    </div>

    <add-new-modal
      :currentEditIntent="selectedIntent"
      :isEditMode.sync="isEditMode"
      :isShowModal.sync="isShowModal"
    ></add-new-modal>

    <b-row>
      <b-colxx xxs="12">
        <b-card class="mb-4" :title="$t('setup.intent-list')">
          <!-- Main table element -->
          <b-table
            :items="intentItems"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :filter-included-fields="filterOn"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            @filtered="onFiltered"
            :busy="isLoading"
            small
          >
            <!-- <template #cell(name)="row">
              {{ row.value.first }} {{ row.value.last }}
            </template> -->

            <template #cell(actions)="row">
              <b-button
                size="sm"
                v-b-modal.modalright
                @click="setEditMode(row.item)"
                class="mr-1"
                variant="outline-primary"
              >
                <i class="simple-icon-pencil" />
              </b-button>
              <b-button
                variant="outline-primary"
                size="sm"
                @click="deleteIntent(row.item)"
              >
                <i class="simple-icon-trash" />
              </b-button>
            </template>

            <!-- <template #row-details="row">
              <b-card>
                <ul>
                  <li v-for="(value, key) in row.item" :key="key">
                    {{ key }}: {{ value }}
                  </li>
                </ul>
              </b-card>
            </template> -->

            <template #table-busy>
              <div class="text-center my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
          </b-table>

          <!-- Info modal -->
          <b-modal
            :id="infoModal.id"
            :title="infoModal.title"
            ok-only
            @hide="resetInfoModal"
          >
            <pre>{{ infoModal.content }}</pre>
          </b-modal>

          <b-pagination
            size="sm"
            align="center"
            :total-rows="totalRows"
            :per-page="perPage"
            v-model="currentPage"
          >
            <template v-slot:next-text>
              <i class="simple-icon-arrow-right" />
            </template>
            <template v-slot:prev-text>
              <i class="simple-icon-arrow-left" />
            </template>
            <template v-slot:first-text>
              <i class="simple-icon-control-start" />
            </template>
            <template v-slot:last-text>
              <i class="simple-icon-control-end" />
            </template>
          </b-pagination>

          <!-- <b-alert
            v-if="bootstrapTable.selected.length > 0"
            show
            variant="primary"
            >Selected Items :<br />
            <pre>{{ bootstrapTable.selected }}</pre>
          </b-alert> -->
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import AddNewIntent from "@/containers/setup/AddNewIntent";

export default {
  components: {
    "add-new-modal": AddNewIntent,
  },
  data() {
    return {
      fields: [
        {
          key: "name",
          label: "Name",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "description",
          label: "Description",
          sortable: true,
          class: "text-center",
        },

        {
          key: "state",
          label: "State",
          sortable: true,
          class: "text-center",
        },

        { key: "actions", label: "Actions" },
      ],
      totalRows: this?.intentItems?.length || 1,
      selectedIntent: undefined,
      currentPage: 1,
      isEditMode: false,
      isShowModal: false,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  computed: {
    ...mapGetters(["isLoading", "intentItems"]),
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    // Set the initial number of items
    this.getIntentItems();
    this.totalRows = this?.intentItems?.length;
    this.setEditMode();
  },
  updated() {
    this.totalRows = this?.intentItems?.length;
  },
  methods: {
    ...mapActions(["getIntentItems", "deleteIntent"]),

    setEditMode(intent) {
      this.isEditMode = intent ? true : false;
      this.isShowModal = intent ? true : false;
      this.selectedIntent = intent ? intent : { state: "", description: "", name: "" };
    },
    beforeDestroy() {
      this.isEditMode = false;
    },
    changePageSize(option) {
      this.perPage = option;
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>
