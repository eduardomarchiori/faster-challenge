<template>
  <NuxtLayout>
    <div class="error-content flex flex-col justify-center items-center">
      <p class="text-7xl front-bold">{{ error.statusCode }}</p>
      <img
        src="https://cdn.svgator.com/images/2022/01/funny-404-error-page-design.gif"
        alt="animation"
        width="400"
      />
      <p>{{ error.message }}</p>
    </div>
  </NuxtLayout>
</template>

<script setup>
defineProps(["error"]);
</script>

<style scoped>
img {
  margin: -12px 0;
}

p {
  z-index: 1;
}

.error-content {
  flex-grow: 1;
}

.error-content {
  flex-shrink: 0;
}
</style>
