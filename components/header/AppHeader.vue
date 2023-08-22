<template>
  <header class="w-full p-4">
    <div class="flex flex-col md:flex-row justify-center items-center w-full">
      <div
        class="flex w-10/12 md:w-8/12 justify-between items-center mb-3.5 md:mb-0"
      >
        <div class="text-lg text-white">
          <a href="/"><b>My Drinks</b></a>
        </div>

        <div>
          <v-btn
            variant="outlined"
            href="https://www.fstr.co/"
            target="_blank"
            class="py-2 px-6 rounded-md text-white"
          >
            FASTER
          </v-btn>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
header {
  background-color: #131843 !important;
}
</style>
