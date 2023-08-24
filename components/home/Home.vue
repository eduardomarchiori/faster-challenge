<template>
  <div class="w-11/12 md:w-8/12">
    <SearchActions
      :categories="categories"
      v-model:name="searchName"
      @update:modelValue="onChangeCategory"
    />

    <div class="bg-white rounded-lg p-4">
      <div class="w-full relative">
        <div class="flex bg-gray-200 gap-4 t-row py-2 px-4 rounded-lg">
          <div>Item</div>
          <div class="action">Action</div>
        </div>
        <template v-if="!loading">
          <div
            v-for="item in filtredItems"
            :key="item.idDrink"
            class="flex gap-4 t-col py-2 px-4"
          >
            <div
              class="cursor-pointer truncate"
              @click="(event) => onClickItem(event, item)"
            >
              {{ item.strDrink }}
            </div>
            <div class="action flex justify-center hidden fold:flex">
              <v-icon
                class="mr-6 cursor-pointer"
                size="large"
                color="yellow-darken-2"
                :icon="item.isFavorite ? 'mdi-star' : 'mdi-star-outline'"
                @click="onFavorite(item)"
              ></v-icon>
            </div>
          </div>
        </template>
        <div
          v-if="!filtredItems.length && !loading"
          class="text-black mt-4 text-center"
        >
          Informations not found
        </div>
        <div v-if="loading" class="flex justify-center items-center mt-4">
          <Spin />
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
import Spin from "../spin/Spin.vue";
import SearchActions from "../search/SearchActions.vue";
import { ref, computed } from "vue";

export default {
  components: {
    Modal,
    Toaster,
    Spin,
    SearchActions,
  },
  async setup() {
    useHead({
      title: "My Drinks",
    });

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

    const onClickItem = async (event, item) => {
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
