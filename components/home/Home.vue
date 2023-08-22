<template>
  <div class="w-8/12">
    <div class="bg-white rounded-lg flex justify-between px-5 pt-5 mb-4">
      <div class="w-5/12 flex">
        <v-autocomplete
          return-object
          @update:modelValue="onChangeCategory"
          class="mr-4 w-5/12"
          density="compact"
          label="Autocomplete"
          item-title="title"
          :items="categories"
          variant="outlined"
        ></v-autocomplete>
        <v-text-field
          v-model="searchName"
          class="w-7/12"
          density="compact"
          label="Label"
          variant="outlined"
        ></v-text-field>
      </div>
    </div>

    <div class="bg-white rounded-lg p-4">
      <div class="w-full relative">
        <div class="flex bg-gray-200 gap-4 t-row py-2 px-4 rounded-lg">
          <div>Item</div>
          <div class="action">Action</div>
        </div>
        <div
          v-for="item in filtredItems"
          :key="item.idDrink"
          class="flex gap-4 t-col py-2 px-4"
        >
          <div
            class="cursor-pointer"
            @click="(event) => onClickItem(event, item)"
          >
            {{ item.strDrink }}
          </div>
          <div class="action flex justify-center">
            <v-icon
              class="mr-6 cursor-pointer"
              size="large"
              color="yellow-darken-2"
              :icon="item.isFavorite ? 'mdi-star' : 'mdi-star-outline'"
              @click="onFavorite(item)"
            ></v-icon>
          </div>
        </div>
      </div>
    </div>
    <Modal
      :item="itemSelect"
      @show="($event) => (showModal = $event)"
      :isShow="showModal"
    />
    <Toaster v-model="toaster" :errorText="errorText" />
  </div>
</template>

<script>
import {
  getCategories,
  getItemsByCategory,
  getItemDetails,
} from "../../services/items/itemsService";
import {
  getItemOnStorage,
  setItemOnStorage,
} from "../../services/storage/storageService";
import Modal from "../modal/Modal.vue";
import Toaster from "../toaster/Toaster.vue";
import { ref, computed } from "vue";

export default {
  components: {
    Modal,
    Toaster,
  },
  async setup() {
    const items = ref([]);
    const categories = ref([]);
    const category = ref(null);
    const searchName = ref("");
    const showModal = ref(false);
    const itemSelect = ref({});
    const toaster = ref(false);
    const errorText = ref("");

    const getFavoriteItems = (item) => {
      const storageItemsList = JSON.parse(getItemOnStorage()) || [];
      const correctItems = storageItemsList.find(
        ({ category: cat }) => cat === category.value.value
      );
      const favoriteItem = (correctItems?.items || []).find(
        (idItem) => idItem === item.idDrink
      );

      if (favoriteItem) {
        return { ...item, isFavorite: true };
      }

      return { ...item, isFavorite: false };
    };

    const load = async () => {
      try {
        categories.value = (await getCategories()).drinks.map(
          ({ strCategory }) => ({ title: strCategory, value: strCategory })
        );

        category.value = categories.value[0];

        items.value = (
          await getItemsByCategory(category.value.value)
        ).drinks.map(getFavoriteItems);
      } catch (error) {
        toaster.value = true;
        errorText.value = error.message;
      }
    };

    load();

    const onChangeCategory = async (item) => {
      category.value = item;
      try {
        items.value = (await getItemsByCategory(item.value)).drinks.map(
          getFavoriteItems
        );
        searchName.value = "";
      } catch (error) {
        toaster.value = true;
        errorText.value = error.message;
      }
    };

    const filtredItems = computed(() => {
      if (!searchName.value) {
        return items.value;
      }

      return items.value.filter(({ strDrink }) =>
        strDrink.toLowerCase().includes(searchName.value.toLowerCase())
      );
    });

    const onFavorite = (item) => {
      item.isFavorite = !item.isFavorite;
      const favoriteItems = items.value
        .filter(({ isFavorite }) => !!isFavorite)
        .map(({ idDrink }) => idDrink);
      setItemOnStorage({
        category: category.value.value,
        items: favoriteItems,
      });
    };

    const onClickItem = async (event, item) => {
      console.log(item);
      const [response] = (await getItemDetails(item.strDrink)).drinks;
      itemSelect.value = response;
      console.log(itemSelect.value);
      showModal.value = true;
    };

    return {
      categories,
      category,
      items,
      onChangeCategory,
      onFavorite,
      filtredItems,
      searchName,
      showModal,
      onClickItem,
      itemSelect,
      toaster,
      errorText,
    };
  },
};
</script>

<style scoped>
.t-row > div {
  min-width: 200px;
  font-weight: bold;
}

.t-row > .action {
  min-width: 70px;
  position: absolute;
  right: 0;
}

.t-col > div {
  min-width: 200px;
}

.t-col > .action {
  min-width: 70px;
  position: absolute;
  right: 0;
}
</style>
