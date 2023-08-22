<template>
  <v-dialog transition="dialog-bottom-transition" width="400" v-model="show">
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-toolbar
          color="#131843"
          class="text-white"
          title="Item Details"
        ></v-toolbar>
        <div class="flex flex-col items-center justify-center p-6">
          <img :src="item.strDrinkThumb" :alt="item.strDrink" width="200" />
          <p class="mt-8">
            {{
              item.strInstructions || "There is no instructions to this item"
            }}
          </p>
        </div>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="close(isActive)">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { ref, watch } from "vue";

export default {
  props: {
    isShow: Boolean,
    item: Object,
  },
  setup(props, { emit }) {
    const show = ref(false);

    const close = (isActive) => {
      isActive.value = false;
      emit("show", false);
    };

    watch(
      () => props.isShow,
      (value) => {
        show.value = value;
      }
    );

    return {
      show,
      close,
    };
  },
};
</script>
