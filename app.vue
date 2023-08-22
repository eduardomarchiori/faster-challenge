<template>
  <NuxtLayout>
    <Suspense>
      <NuxtPage />
    </Suspense>
  </NuxtLayout>
</template>

<style>
main {
  flex-grow: 1;
}

.content {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

html,
body {
  width: 100%;
  height: 100%;
}

header,
main,
footer {
  flex-shrink: 0;
}
</style>
