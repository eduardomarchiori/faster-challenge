<template>
  <div class="w-11/12 md:w-8/12">
    <SearchActions
      :categories="categories"
      v-model:name="searchName"
      @update:modelValue="onChangeCategory"
    />

    <ItemsTable
      :loading="loading"
      :items="filtredItems"
      @favorited="(item) => onFavorite(item)"
      @item-clicked="(event) => onClickItem(event)"
    />

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
import SearchActions from "../search/SearchActions.vue";
import ItemsTable from "../table/Table.vue";
import { ref, computed } from "vue";

export default {
  components: {
    Modal,
    Toaster,
    SearchActions,
    ItemsTable,
  },
  async setup() {
    // useHead({
    //   title: "My Drinks",
    // });

    const items = ref([]);
    const categories = ref([]);
    const category = ref(null);
    const searchName = ref("");
    const showModal = ref(false);
    const loading = ref(false);
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
      loading.value = true;

      try {
        categories.value = (await getCategories()).drinks.map(
          ({ strCategory }) => ({ title: strCategory, value: strCategory })
        );

        category.value = categories.value[0];

        items.value = (
          await getItemsByCategory(category.value.value)
        ).drinks.map(getFavoriteItems);
        loading.value = false;
      } catch (error) {
        toaster.value = true;
        errorText.value = error.message;
        loading.value = false;
      }
    };

    load();

    const onChangeCategory = async (item) => {
      loading.value = true;
      category.value = item;
      try {
        items.value = (await getItemsByCategory(item.value)).drinks.map(
          getFavoriteItems
        );
        searchName.value = "";
        loading.value = false;
      } catch (error) {
        toaster.value = true;
        errorText.value = error.message;
        loading.value = false;
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

    const onClickItem = async (item) => {
      const [response] = (await getItemDetails(item.strDrink)).drinks;
      itemSelect.value = response;
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
      loading,
    };
  },
};
</script>
