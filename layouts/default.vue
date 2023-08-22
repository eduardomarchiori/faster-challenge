<template>
  <div class="content">
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from "../components/footer/AppFooter.vue";
import AppHeader from "../components/header/AppHeader.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>
