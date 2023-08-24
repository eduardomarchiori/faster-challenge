<template>
  <div class="bg-white rounded-lg flex justify-between px-5 pt-5 mb-4">
    <div class="w-full md:w-5/12 flex flex-col md:flex-row">
      <v-autocomplete
        return-object
        @update:modelValue="($event) => $emit('update:modelValue', $event)"
        class="mr-4 w-full md:w-5/12"
        density="compact"
        label="Categories"
        item-title="title"
        :items="categories"
        variant="outlined"
      ></v-autocomplete>
      <v-text-field
        :model-value="name"
        @update:modelValue="emitTextValue"
        class="w-full md:w-7/12"
        density="compact"
        label="Search by name"
        variant="outlined"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchActions",
  props: {
    modelValue: Object,
    name: String,
    categories: Array,
  },
  setup(props, { emit }) {
    const emitTextValue = (value) => {
      emit("update:name", value);
    };

    return {
      emitTextValue,
    };
  },
};
</script>
