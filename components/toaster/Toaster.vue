<template>
  <v-snackbar :model-value="modelValue">
    {{ errorText }}

    <template v-slot:actions>
      <v-btn color="red" variant="text" @click="changeStatus(false)">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    errorText: String,
    modelValue: Boolean,
  },
  emits: ["update:modelValue"],
  methods: {
    changeStatus(status) {
      this.$emit("update:modelValue", status); // previously was `this.$emit('input', title)`
    },
  },
};
</script>

<style></style>
