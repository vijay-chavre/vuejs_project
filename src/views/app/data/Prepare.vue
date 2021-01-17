<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <!-- <h1>{{ title }}</h1> -->
        <piaf-breadcrumb :heading="$t('menu.data-prepare')" />
        <div class="mb-2 mt-2">
          <div class="d-block d-md-inline-block pt-1">
            <div class="d-inline-block float-md-left mr-1 align-top">
              <div class="search-sm d-inline-block float-md-left mr-1 align-top">
                <b-input
                  :placeholder="$t('menu.search')"
                  v-model="filter"
                  @input="(val) => searchChange(val)"
                />
              </div>
            </div>
            <div class="d-inline-block float-md-left mr-1 align-middle">
              <b-form-checkbox
                id="checkbox-1"
                v-model="isSelectAll"
                name="checkbox-1"
                value="true"
                unchecked-value="false"
              >
                Select All
              </b-form-checkbox>
            </div>
          </div>
          <div class="float-md-right pt-1"></div>
        </div>
        <div class="separator mb-2" />
      </b-colxx>
    </b-row>

    <add-new-modal
      :currentEditIntent="selectedIntent"
      :isEditMode.sync="isEditMode"
      :isShowModal.sync="isShowModal"
    ></add-new-modal>

    <b-row>
      <b-colxx xxs="12">
        <!-- Main table element -->
        <b-table
          class="table-divided order-with-arrow"
          :items="data"
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
          show-empty
          select-mode="multi"
          ref="selectableTable"
          selectable
        >
          <!-- <template #cell(name)="row">
              {{ row.value.first }} {{ row.value.last }}
            </template> -->

          <!-- <template #cell(actions)="row">
            <b-button
              size="sm"
              v-b-modal.modalright
              @click="setEditMode(row.item)"
              class="mr-1"
              variant="outline-primary"
            >
              <i class="simple-icon-pencil" />
            </b-button>
            <b-button variant="outline-primary" size="sm" @click="deleteIntent(row.item)">
              <i class="simple-icon-trash" />
            </b-button>
          </template> -->

          <!-- <template #row-details="row">
              <b-card>
                <ul>
                  <li v-for="(value, key) in row.item" :key="key">
                    {{ key }}: {{ value }}
                  </li>
                </ul>
              </b-card>
            </template> -->

          <template #empty="scope">
            <h4>{{ scope.emptyText }}</h4>
          </template>
          <template #emptyfiltered="scope">
            <h4>{{ scope.emptyFilteredText }}</h4>
          </template>

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
          @change="onChangePagination"
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
      data: [
        {
          id: 18,
          title: "Bebinca",
          img: "/assets/img/bebinca-thumb.jpg",
          category: "Desserts",
          status: "PROCESSED",
          statusColor: "secondary",
          description: "Homemade cheesecake with fresh berries and mint",
          sales: 574,
          stock: 16,
          date: "11.11.2020",
        },
        {
          id: 8,
          title: "Cheesecake",
          img: "/assets/img/cheesecake-thumb.jpg",
          category: "Cakes",
          status: "ON HOLD",
          statusColor: "primary",
          description: "Delicious vegan chocolate cake",
          sales: 887,
          stock: 21,
          date: "16.11.2020",
        },
        {
          id: 3,
          title: "Chocolate Cake",
          img: "/assets/img/chocolate-cake-thumb.jpg",
          category: "Cakes",
          status: "PROCESSED",
          statusColor: "secondary",
          description: "Homemade cheesecake with fresh berries and mint",
          sales: 1080,
          stock: 57,
          date: "12.11.2020",
        },
        {
          id: 19,
          title: "Cremeschnitte",
          img: "/assets/img/cremeschnitte-thumb.jpg",
          category: "Desserts",
          status: "ON HOLD",
          statusColor: "primary",
          description: "Cheesecake with chocolate cookies and Cream biscuits",
          sales: 562,
          stock: 18,
          date: "10.11.2020",
        },
        {
          id: 2,
          title: "Fat Rascal",
          img: "/assets/img/fat-rascal-thumb.jpg",
          category: "Cupcakes",
          status: "PROCESSED",
          statusColor: "secondary",
          description: "Cheesecake with chocolate cookies and Cream biscuits",
          sales: 1240,
          stock: 48,
          date: "15.11.2020",
        },
        {
          id: 9,
          title: "Financier",
          img: "/assets/img/financier-thumb.jpg",
          category: "Cakes",
          status: "ON HOLD",
          statusColor: "primary",
          description:
            "White chocolate strawberry yogurt cake decorated with fresh fruits and chocolate",
          sales: 865,
          stock: 53,
          date: "08.11.2020",
        },
        {
          id: 17,
          title: "Fruitcake",
          img: "/assets/img/fruitcake-thumb.jpg",
          category: "Cakes",
          status: "PROCESSED",
          statusColor: "secondary",
          description: "Chocolate cake with berries",
          sales: 585,
          stock: 19,
          date: "09.11.2020",
        },
        {
          id: 10,
          title: "Genoise",
          img: "/assets/img/genoise-thumb.jpg",
          category: "Cupcakes",
          status: "PROCESSED",
          statusColor: "secondary",
          description: "Christmas fruit cake, pudding on top",
          sales: 824,
          stock: 55,
          date: "03.11.2020",
        },
        {
          id: 11,
          title: "Gingerbread",
          img: "/assets/img/gingerbread-thumb.jpg",
          category: "Cakes",
          status: "ON HOLD",
          statusColor: "primary",
          description: "Wedding cake decorated with donuts and wild berries",
          sales: 714,
          stock: 12,
          date: "07.11.2020",
        },
        {
          id: 4,
          title: "Goose Breast",
          img: "/assets/img/goose-breast-thumb.jpg",
          category: "Cakes",
          status: "PROCESSED",
          statusColor: "secondary",
          description: "Chocolate cake with berries",
          sales: 1014,
          stock: 41,
          date: "13.11.2020",
        },
      ],
      fields: [
        {
          key: "title",
          label: "Title",
          sortable: true,
          sortDirection: "desc",
          tdClass: "list-item-heading",
        },
        { key: "sales", label: "Sales", sortable: true, tdClass: "text-muted" },
        { key: "stock", label: "Stock", sortable: true, tdClass: "text-muted" },
        { key: "category", label: "Category", sortable: true, tdClass: "text-muted" },
        { key: "status", label: "Status", sortable: true, tdClass: "text-muted" },
      ],
      totalRows: this?.intentItems?.length || 1,
      selectedIntent: undefined,
      currentPage: 1,
      isEditMode: false,
      isShowModal: false,
      isSelectAll: "false",
      isLoading: false,
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
    // Set the initial number of item
    this.totalRows = this?.data?.length;
  },
  updated() {
    this.totalRows = this?.data?.length;
  },
  watch: {
    isSelectAll: function (newVal, oldVal) {
      this.showSelcted(newVal);
    },
  },
  methods: {
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

    showSelcted(val) {
      if (val === "true") {
        console.log("all select", val);
        this.$refs.selectableTable.selectAllRows();
      }
      if (val === "false") {
        this.$refs.selectableTable.clearSelected();
      }
    },
    onChangePagination(page) {
      //console.log(page); 1
      this.showSelcted(this.isSelectAll);
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
