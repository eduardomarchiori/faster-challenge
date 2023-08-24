<template>
  <div class="bg-white rounded-lg p-4">
    <div class="w-full relative">
      <div
        id="table-header"
        class="flex bg-gray-200 gap-4 t-row py-2 px-4 rounded-lg"
      >
        <div>Item</div>
        <div class="action">Action</div>
      </div>
      <div id="table-body" v v-if="!loading">
        <div
          v-for="item in items"
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
      </div>
      <div
        id="no-info"
        v-if="!items.length && !loading"
        class="text-black mt-4 text-center"
      >
        Informations not found
      </div>
      <div v-if="loading" class="flex justify-center items-center mt-4">
        <Spin />
      </div>
    </div>
  </div>
</template>

<script>
import Spin from "../spin/Spin.vue";

export default {
  name: "Table",
  components: {
    Spin,
  },
  props: {
    loading: Boolean,
    items: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const onFavorite = (item) => {
      emit("favorited", item);
    };

    const onClickItem = (event, item) => {
      emit("item-clicked", item);
    };

    return {
      onFavorite,
      onClickItem,
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
