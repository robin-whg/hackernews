<template>
  <div class="mx-auto max-w-3xl border-gray-200 dark:border-gray-700 md:border-x">
    <TheNavbar />
    <div class="min-h-screen flex flex-col">
      <slot />
    </div>
    <TheFooter />
  </div>
</template>
