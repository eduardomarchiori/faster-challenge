<template>
  <main class="w-full bg-gray-100 flex justify-center items-center py-12">
    <Suspense>
      <Home />
    </Suspense>
  </main>
</template>

<script>
import Home from "../components/home/Home.vue";
export default {
  components: {
    Home,
  },
};
</script>

<style scoped></style>
